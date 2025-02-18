import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext/Cart.Context';
import { userContext } from '../../context/UserContext/User.context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const { cartInfo } = useContext(CartContext);
    const { token } = useContext(userContext);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const navigate = useNavigate();

    async function createCashOrder(values) {
        let toastId = toast.loading("Processing Your Order...");
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                values,
                { headers: { token } }
            );
            if (data.status === 'success') {
                toast.success("Order Created Successfully ✅");
                setTimeout(() => navigate('/allorders'), 2000);
            }
        } catch (error) {
            toast.error("Failed to create order.");
        } finally {
            toast.dismiss(toastId);
        }
    }

    async function onlinePaymentOrder(values) {
        let toastId = toast.loading("Redirecting to Payment Gateway...");
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                values,
                { headers: { token } }
            );
            if (data.status === 'success') {
                toast.success("Redirecting to Payment Page ✅");
                setTimeout(() => location.href = data.session.url, 2000);
            }
        } catch (error) {
            toast.error("Payment process failed.");
        } finally {
            toast.dismiss(toastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress: { details: "", phone: "", city: "" }
        },
        onSubmit: (values) => {
            paymentMethod === "cash" ? createCashOrder(values) : onlinePaymentOrder(values);
        }
    });

    return (
        <section className="container mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl border border-gray-200">
            <h1 className='text-3xl font-bold text-gray-900 mb-6 text-center'>Checkout</h1>
            <p className="text-gray-600 text-center mb-8">Complete your order by providing shipping details.</p>

            <form className='space-y-6' onSubmit={formik.handleSubmit}>
                {/* Phone */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input type="tel" className="form-control w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-500" placeholder="Enter phone number"
                        value={formik.values.shippingAddress.phone} onChange={formik.handleChange} name='shippingAddress.phone' required />
                </div>

                {/* City */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">City</label>
                    <input type="text" className="form-control w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-500" placeholder="Enter city"
                        value={formik.values.shippingAddress.city} onChange={formik.handleChange} name='shippingAddress.city' required />
                </div>

                {/* Address Details */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Address Details</label>
                    <textarea className="form-control w-full p-3 border rounded-md focus:ring-2 focus:ring-primary-500" placeholder="Enter address details"
                        value={formik.values.shippingAddress.details} onChange={formik.handleChange} name='shippingAddress.details' required />
                </div>

                {/* Payment Method Selection */}
                <div className="flex justify-center gap-6 mt-6">
                    <button type="submit" onClick={() => setPaymentMethod("cash")}
                        className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-all'>
                        Cash on Delivery
                    </button>
                    <button type="submit" onClick={() => setPaymentMethod("online")}
                        className='px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-all'>
                        Online Payment
                    </button>
                </div>
            </form>
        </section>
    );
}
