import React, { useContext, useEffect, useState } from 'react';
import freshCartLogo from '../../assets/imgs/freshcart-logo.svg';
import { NavLink } from 'react-router-dom';
import { userContext } from './../../context/UserContext/User.context';
import { CartContext } from '../../context/CartContext/Cart.Context';

export default function Navbar() {
  const { token, logOut } = useContext(userContext);
  const { cartInfo, wishListDetails, getLoggedWishList, getCartProducts } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getCartProducts();
    getLoggedWishList();
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50 py-4 px-6 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/">
          <img className="w-36" src={freshCartLogo} alt="FreshCart Logo" />
        </NavLink>

        {/* Toggler Button (for mobile menu) */}
        <button
          className="lg:hidden text-primary-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
        </button>

        {/* Navbar Links */}
        <div
          className={`lg:flex flex-col lg:flex-row lg:gap-8 items-center ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none p-5 lg:p-0`}
        >
          {token && (
            <ul className="flex flex-col lg:flex-row gap-6 items-center text-lg font-semibold">
              
              {/* ✅ Corrected NavLink for Home */}
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `relative px-3 py-2 transition-all duration-300 hover:text-primary-700 ${
                      isActive ? 'text-primary-700 border-b-2 border-primary-700' : 'text-gray-700'
                    }`
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              {/* Other Navigation Links */}
              {['Products', 'Categories', 'Brands', 'Orders'].map((item) => (
                <li key={item}>
                  <NavLink
                    className={({ isActive }) =>
                      `relative px-3 py-2 transition-all duration-300 hover:text-primary-700 ${
                        isActive ? 'text-primary-700 border-b-2 border-primary-700' : 'text-gray-700'
                      }`
                    }
                    to={`/${item.toLowerCase()}`}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Section: Cart, Wishlist, Auth, and Social Icons */}
        <div className="flex items-center gap-6">
          
          {/* Social Media Icons */}
          <div className="flex gap-4 text-gray-600 text-xl">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-blue-600">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer" className="hover:text-blue-400">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" className="hover:text-black">
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>

          {/* Cart Icon */}
          {token && (
            <NavLink to="/cart" className="relative text-gray-700 hover:text-primary-700">
              <i className="fa-solid fa-cart-shopping text-xl"></i>
              {cartInfo && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 text-xs text-white bg-primary-700 rounded-full flex items-center justify-center">
                  {cartInfo.numOfCartItems}
                </span>
              )}
            </NavLink>
          )}

          {/* Wishlist Icon */}
          {token && (
            <NavLink to="/wishlist" className="relative text-gray-700 hover:text-primary-700">
              <i className="fa-solid fa-heart text-xl"></i>
              {wishListDetails && (
                <span className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 text-xs text-white bg-primary-700 rounded-full flex items-center justify-center">
                  {wishListDetails.length}
                </span>
              )}
            </NavLink>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!token ? (
              <>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-all"
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-primary-700 text-primary-700 font-semibold rounded-lg hover:bg-primary-700 hover:text-white transition-all"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <button
                onClick={logOut}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
