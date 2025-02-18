import { useFormik } from 'formik';
import { object, string } from 'yup';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../context/UserContext/User.context';

export default function Login() {
  let { setToken } = useContext(userContext);
  const navigate = useNavigate();
  const [wrongEmailOrPassword, setWrongEmailOrPassword] = useState(null);
  const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required('Email is Required').email('Invalid email format!'),
    password: string()
      .required('Password is required!')
      .matches(
        passRegex,
        'Password must be at least 8 characters, contain one uppercase letter, one lowercase letter, one number, and one special character.'
      ),
  });

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading('Authenticating...');
    try {
      const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        toast.success("Login Successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      setWrongEmailOrPassword(error.response?.data?.message);
    } finally {
      toast.dismiss(loadingToastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: sendDataToLogin,
  });

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-lg p-10 mt-12 border border-gray-200">
      <h1 className="text-3xl text-gray-900 font-extrabold mb-6 text-center">
        <i className="fa-regular fa-circle-user text-primary-700 mr-2"></i> Login
      </h1>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>

        {/* Email */}
        <div>
          <label className="text-gray-700 font-medium block mb-1">Email Address</label>
          <input
            type="email"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-700 font-medium block mb-1">Password</label>
          <input
            type="password"
            className="form-control w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-700 focus:outline-none text-lg"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>
          )}

          {wrongEmailOrPassword && (
            <p className="text-red-500 mt-1 text-sm">*{wrongEmailOrPassword}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-primary-700 text-white font-bold py-3 rounded-md hover:bg-primary-800 transition-all duration-300 shadow-md text-lg"
        >
          Login
        </button>
      </form>

      {/* Register NavLink */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-lg">Don't have an account?</p>
        <NavLink
          to={'/signup'}
          className="text-primary-700 hover:underline text-lg font-semibold"
        >
          Sign up now
        </NavLink>
      </div>
    </div>
  );
}
