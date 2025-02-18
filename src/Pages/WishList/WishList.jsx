import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CartContext } from './../../context/CartContext/Cart.Context';

export default function Wishlist() {
    const { wishListDetails, numOfFavoriteItems, getLoggedWishList, removeItemFromWishList } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlist() {
            setLoading(true);
            await getLoggedWishList();
            setLoading(false);
        }
        fetchWishlist();
    }, []);

    return (
        <section className="p-8 mt-24">
            {/* Wishlist Header */}
            <div className="flex items-center gap-6 mb-10">
                <i className="text-5xl fa-solid fa-heart text-red-500 animate-pulse"></i>
                <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">Your Wishlist</h2>
            </div>

            {/* Loading Indicator */}
            {loading ? (
                <div className="flex justify-center items-center h-60">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary-600"></div>
                </div>
            ) : numOfFavoriteItems === 0 ? (
                <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-xl shadow-md dark:bg-gray-800">
                    <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-4">
                        Oops! Your Wishlist is empty. Start exploring and save your favorite products.
                    </h2>
                    <NavLink
                        to="/"
                        className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300"
                    >
                        Back to Home
                    </NavLink>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishListDetails.map((product) => (
                        <div
                            key={product._id}
                            className="group relative bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={product.imageCover}
                                    alt={product.name}
                                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <h3 className="text-white text-lg font-semibold">{product.name}</h3>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                                    Price: <span className="font-semibold text-primary-700">${product.price}</span>
                                </p>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeItemFromWishList(product._id)}
                                    className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
