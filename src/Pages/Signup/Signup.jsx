import { useFormik } from 'formik';
import { object, ref, string } from 'yup';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [existAccountError, setExistAccountError] = useState(null);
  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;

  const validationSchema = object({
    name: string()
      .required('Name is required')
      .min(3, 'Must be at least 3 characters')
      .max(25, "Cannot exceed 25 characters"),
    email: string().required('Email is required').email('Invalid email address'),
    password: string()
      .required('Password is required')
      .matches(
        passRegex,
        'Password must have 8+ characters, one uppercase, one lowercase, one number, and one special character'
      ),
    rePassword: string()
      .required('Confirm Password is required')
      .oneOf([ref('password')], 'Passwords must match'),
    phone: string()
      .required('Phone number is required')
      .matches(phoneRegex, 'Must be a valid Egyptian phone number'),
  });

  async function sendDataToRegister(values) {
    const loadingToastId = toast.loading('Processing...');
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      );
      if (data.message === 'success') {
        toast.success('Account created successfully! Redirecting...');
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setExistAccountError(error.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: sendDataToRegister,
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-10 mt-12 border border-gray-200">
      <h1 className="text-3xl text-gray-900 font-extrabold mb-6 text-center">
        <i className="fa-regular fa-circle-user text-primary-700 mr-2"></i> Sign Up
      </h1>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>

        <div>
          <label className="text-gray-700 font-medium block mb-1">Full Name</label>
          <input
            type="text"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Enter your name"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">*{formik.errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-gray-700 font-medium block mb-1">Email Address</label>
          <input
            type="email"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Enter your email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">*{formik.errors.email}</p>
          )}
          {existAccountError && (
            <p className="text-red-500 text-sm">*{existAccountError}</p>
          )}
        </div>

        <div>
          <label className="text-gray-700 font-medium block mb-1">Password</label>
          <input
            type="password"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Enter your password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">*{formik.errors.password}</p>
          )}
        </div>

        <div>
          <label className="text-gray-700 font-medium block mb-1">Confirm Password</label>
          <input
            type="password"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Confirm your password"
            {...formik.getFieldProps("rePassword")}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500 text-sm">*{formik.errors.rePassword}</p>
          )}
        </div>

        <div>
          <label className="text-gray-700 font-medium block mb-1">Phone Number</label>
          <input
            type="tel"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Enter your phone number"
            {...formik.getFieldProps("phone")}
          />
          {formik.touched.phone && formik.errors.phone && (
            <p className="text-red-500 text-sm">*{formik.errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-700 text-white font-bold py-3 rounded-md hover:bg-primary-800 transition-all duration-300 shadow-md text-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
