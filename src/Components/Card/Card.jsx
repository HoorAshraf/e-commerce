import { useContext } from "react";
import { CartContext } from "../../context/CartContext/Cart.Context";
import { Link } from "react-router-dom";

export default function Card({ productInfo }) {
  const { imageCover, title, category, price, ratingsAverage, description, id } = productInfo;
  const { addProductToCart, addToWishList } = useContext(CartContext);

  return (
    <div className="group/card max-w-sm w-full p-5 shadow-md rounded-xl border border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-xl bg-white">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={imageCover}
          className="w-full h-60 object-cover rounded-xl transition-transform duration-300 group-hover/card:scale-105"
          alt={title}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 gap-4">
          <button
            onClick={() => addToWishList({ productId: id })}
            className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all duration-300 shadow-md"
          >
            <i className="fa-solid fa-heart text-lg"></i>
          </button>
          <button
            onClick={() => addProductToCart({ productId: id })}
            className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-all duration-300 shadow-md"
          >
            <i className="fa-solid fa-cart-shopping text-lg"></i>
          </button>
          <Link
            to={`/productDetails/${id}`}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            <i className="fa-solid fa-eye text-lg"></i>
          </Link>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-bold text-gray-900 truncate">{title}</h3>
        <h4 className="text-primary-600 font-semibold text-xs uppercase tracking-wide">{category.name}</h4>
        <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">{description}</p>
        <hr className="my-4 border-gray-300" />
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">{price} L.E</span>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-500 text-md"></i>
            <span className="text-gray-700 font-medium text-md">{ratingsAverage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
