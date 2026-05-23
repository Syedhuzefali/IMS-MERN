import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { buildApiUrl } from '../config/api';

export default function InsertProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productBarcode) {
      setError("All fields are required");
      return;
    }

    if (productPrice <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (productBarcode.length < 6) {
      setError("Barcode must be at least 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(buildApiUrl("/api/products/insertproduct"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ProductName: productName,
          ProductPrice: parseFloat(productPrice),
          ProductBarcode: productBarcode
        })
      });

      if (res.status === 201) {
        alert("Product added successfully!");
        navigate('/products');
      } else if (res.status === 422) {
        setError("Product with this barcode already exists");
      } else {
        setError("Failed to add product");
      }
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Add Product</h1>

        {error && <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={addProduct} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Product Price (₹) *
            </label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter product price"
              step="0.01"
              min="0"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Product Barcode *
            </label>
            <input
              type="text"
              value={productBarcode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                setProductBarcode(value);
              }}
              placeholder="Enter barcode (6-12 digits)"
              maxLength="12"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
              disabled={loading}
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{productBarcode.length}/12 digits</p>
          </div>

          <div className="flex gap-4 pt-4">
            <NavLink
              to="/products"
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded text-center hover:bg-gray-600"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}