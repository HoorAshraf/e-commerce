import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext/Cart.Context';
import { NavLink } from 'react-router-dom';

export default function CartItem({ productInfo }) {
    const { count, price, product } = productInfo;
    const { title, imageCover, category, id } = product;
    let { removeProductFromCart, updateProductCount } = useContext(CartContext);

    return (
        <div className="flex items-center justify-between bg-white shadow-lg p-6 rounded-2xl border border-gray-300 transition-all duration-300 hover:shadow-2xl">
            {/* Product Image */}
            <img src={imageCover} className='w-24 h-24 rounded-xl object-cover border border-gray-300' alt={title} />
            
            {/* Product Info */}
            <div className="flex flex-col flex-1 ml-6">
                <NavLink to={`/productDetails/${id}`} className='text-xl font-bold text-gray-900 hover:text-primary-700 transition-colors'>
                    {title}
                </NavLink>
                <h4 className='text-md text-gray-500 font-medium mt-1'>{category.name}</h4>
                <span className='text-lg font-extrabold text-primary-700 mt-2'>{price} L.E</span>
            </div>
            
            {/* Quantity Control */}
            <div className="flex items-center gap-5">
                <button onClick={() => updateProductCount({ productId: id, count: count + 1 })} 
                        className="w-10 h-10 flex items-center justify-center bg-primary-700 hover:bg-primary-800 text-white rounded-xl shadow-lg transition-all duration-300">
                    <i className='fa-solid fa-plus text-lg'></i>
                </button>
                <span className='text-xl font-bold text-gray-900'>{count}</span>
                <button onClick={() => updateProductCount({ productId: id, count: count - 1 })} 
                        className="w-10 h-10 flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl shadow-lg transition-all duration-300">
                    <i className='fa-solid fa-minus text-lg'></i>
                </button>
            </div>
            
            {/* Remove Item */}
            <button onClick={() => removeProductFromCart({ productId: id })} 
                    className='w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-800 text-white rounded-xl shadow-lg transition-all duration-300'>
                <i className='fa-solid fa-xmark text-xl'></i>
            </button>
        </div>
    );
}
