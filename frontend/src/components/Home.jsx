import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-blue-600 dark:bg-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Inventory Management System
          </h1>
          <p className="text-lg mb-8 text-blue-100">
            Manage your products efficiently
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/products"
              className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-300 dark:hover:bg-gray-700"
            >
              View Products
            </NavLink>
            <NavLink
              to="/insertproduct"
              className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300 dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-700"
            >
              Add Product
            </NavLink>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NavLink
            to="/products"
            className="bg-white dark:bg-gray-800 p-6 rounded shadow hover:shadow-lg text-center"
          >
            <h3 className="text-xl font-bold mb-2 dark:text-white">View Products</h3>
            <p className="text-gray-600 dark:text-gray-400">See all your inventory products</p>
          </NavLink>

          <NavLink
            to="/insertproduct"
            className="bg-white dark:bg-gray-800 p-6 rounded shadow hover:shadow-lg text-center"
          >
            <h3 className="text-xl font-bold mb-2 dark:text-white">Add Product</h3>
            <p className="text-gray-600 dark:text-gray-400">Add new products to inventory</p>
          </NavLink>

          <NavLink
            to="/about"
            className="bg-white dark:bg-gray-800 p-6 rounded shadow hover:shadow-lg text-center"
          >
            <h3 className="text-xl font-bold mb-2 dark:text-white">About</h3>
            <p className="text-gray-600 dark:text-gray-400">Learn more about this system</p>
          </NavLink>
        </div>
      </section>
    </div>
  );
}