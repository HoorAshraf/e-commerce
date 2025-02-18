import React from "react";
import amazonLogo from "../../assets/imgs/amazon-pay.png";
import americanExpressLogo from "../../assets/imgs/American-Express-Color.png";
import masterCardLogo from "../../assets/imgs/mastercard.webp";
import paypalLogo from "../../assets/imgs/paypal.png";
import appStoreLogo from "../../assets/imgs/get-google-play.png";
import appleStoreLogo from "../../assets/imgs/get-apple-store.png";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-16 px-8 mt-16 border-t border-gray-300 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* App Download Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-4 text-primary-700 uppercase tracking-wide">Download Our App</h2>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">Get the best shopping experience on your phone with FreshCart App.</p>
          <div className="flex gap-4 justify-center md:justify-start">
            <img className="w-36 hover:scale-105 transition-all duration-300 drop-shadow-md" src={appStoreLogo} alt="Google Play" />
            <img className="w-32 hover:scale-105 transition-all duration-300 drop-shadow-md" src={appleStoreLogo} alt="Apple Store" />
          </div>
        </div>

        {/* Payment Partners Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary-700 uppercase tracking-wide">Secure Payment Options</h3>
          <div className="flex justify-center gap-6">
            <img className="w-16 hover:scale-105 transition-all duration-300" src={amazonLogo} alt="Amazon Pay" />
            <img className="w-16 hover:scale-105 transition-all duration-300" src={americanExpressLogo} alt="American Express" />
            <img className="w-14 hover:scale-105 transition-all duration-300" src={masterCardLogo} alt="MasterCard" />
            <img className="w-16 hover:scale-105 transition-all duration-300" src={paypalLogo} alt="PayPal" />
          </div>
        </div>

        {/* Contact & Social Links */}
        <div className="text-center md:text-right">
          <h3 className="text-2xl font-bold mb-4 text-primary-700 uppercase tracking-wide">Stay Connected</h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">Follow us for the latest offers, updates, and promotions.</p>
          <div className="flex gap-6 justify-center md:justify-end text-2xl">
            <a href="#" className="hover:text-blue-600 transition-all duration-300 hover:scale-110"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="hover:text-pink-500 transition-all duration-300 hover:scale-110"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-blue-400 transition-all duration-300 hover:scale-110"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-black transition-all duration-300 hover:scale-110"><i className="fa-brands fa-tiktok"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-300 mt-12 pt-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} FreshCart. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
