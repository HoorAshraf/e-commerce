
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-4">Oops! The page you are looking for does not exist.</p>
      <NavLink to="/" className="mt-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
        Back to Home
      </NavLink>
    </div>
  );
}
