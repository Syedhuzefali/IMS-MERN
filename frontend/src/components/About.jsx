import React from 'react';
import { NavLink } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">
            About Inventory Management System
          </h1>
          <p className="text-lg text-blue-100">
            Modern MERN Stack Solution
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded shadow">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">About IMS</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The Inventory Management System (IMS) is a web application built with modern technologies to manage products and inventory efficiently. It provides businesses with tools to track products, update information, and maintain accurate records.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Our system is designed with simplicity and efficiency in mind. It scales with your business needs whether you're running a small shop or a larger operation.
          </p>

          <div className="flex gap-4">
            <NavLink
              to="/products"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              View Products
            </NavLink>
            <NavLink
              to="/insertproduct"
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50"
            >
              Add Product
            </NavLink>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2 dark:text-white">React</h3>
            <p className="text-gray-600 dark:text-gray-400">Frontend UI Library</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Node.js</h3>
            <p className="text-gray-600 dark:text-gray-400">Backend Runtime</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Express.js</h3>
            <p className="text-gray-600 dark:text-gray-400">Web Framework</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow text-center">
            <h3 className="text-xl font-bold mb-2 dark:text-white">MongoDB</h3>
            <p className="text-gray-600 dark:text-gray-400">Database</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Add Products</h3>
            <p className="text-gray-600 dark:text-gray-400">Easily add new products with name, price, and barcode</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2 dark:text-white">View Products</h3>
            <p className="text-gray-600 dark:text-gray-400">Browse and view all your inventory products</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Edit Products</h3>
            <p className="text-gray-600 dark:text-gray-400">Update product details and pricing</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-2 dark:text-white">Delete Products</h3>
            <p className="text-gray-600 dark:text-gray-400">Remove products from your inventory</p>
          </div>
        </div>
      </section>
    </div>
  );
}