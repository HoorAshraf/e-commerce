import React, { useContext, useEffect } from 'react';
import Loading from './../../Components/Loading/Loading';
import { CartContext } from '../../context/CartContext/Cart.Context';
import CartItem from '../../Components/CartItem/CartItem';
import { Link, NavLink } from 'react-router-dom';

export default function Cart() {
    let { getCartProducts, cartInfo, clearCart } = useContext(CartContext);

    useEffect(() => {
        getCartProducts();
    }, []);

    return (
        <>
            {cartInfo == null ? (
                <Loading />
            ) : (
                <section className="container mx-auto mt-20 my-10 p-6 bg-white shadow-lg rounded-xl">
                    <div className='flex gap-6 items-center border-b pb-4'>
                        <i className='text-4xl fa-brands fa-opencart text-primary-700'></i>
                        <h2 className='text-2xl font-bold text-gray-800'>Your Shopping Cart</h2>
                    </div>
                    {cartInfo.numOfCartItems === 0 ? (
                        <div className='flex flex-col gap-4 justify-center items-center mt-8 bg-gray-100 p-6 rounded-md shadow-lg'>
                            <h2 className='text-lg text-gray-700 font-semibold'>Oops! Your Cart Is Empty. Start Shopping Now!</h2>
                            <NavLink to='/' className='btn bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white px-6 py-3 rounded-lg text-lg'>Back To Home</NavLink>
                        </div>
                    ) : (
                        <>
                            <div className='space-y-6 mt-6'>
                                {cartInfo?.data?.products.map((product) => (
                                    <CartItem key={product._id} productInfo={product} />
                                ))}
                            </div>
                            <div className='mt-8 flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded-md shadow-md'>
                                <p className='text-2xl font-semibold text-gray-800 flex items-center'>
                                    <i className='fa-solid fa-sack-dollar text-2xl mr-2 text-primary-800'></i>
                                    Total Price: <span className='text-primary-800 font-bold ml-2'>{cartInfo?.data?.totalCartPrice} L.E</span>
                                </p>

                                <button onClick={clearCart} className='btn bg-red-600 hover:bg-red-800 transition-colors duration-300 text-white px-5 py-3 rounded-lg mt-4 md:mt-0'>
                                    <i className='fa-solid fa-trash text-lg mr-2'></i>
                                    Clear Cart
                                </button>
                            </div>
                            <NavLink
                                to={`/checkout`}
                                className='btn text-center mt-10 bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white px-6 py-3 rounded-lg text-lg block w-full'
                            >
                                Proceed to Checkout
                            </NavLink>
                        </>
                    )}
                </section>
            )}
        </>
    );
}
