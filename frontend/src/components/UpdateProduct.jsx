import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { buildApiUrl } from '../config/api';

export default function UpdateProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(buildApiUrl(`/api/products/products/${id}`), {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (res.ok) {
          const data = await res.json();
          setProductName(data.ProductName || "");
          setProductPrice(data.ProductPrice?.toString() || "");
          setProductBarcode(data.ProductBarcode?.toString() || "");
        } else {
          setError("Failed to load product");
        }
      } catch (err) {
        setError("Error: " + err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const updateProduct = async (e) => {
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

    setUpdating(true);
    setError("");

    try {
      const response = await fetch(
        buildApiUrl(`/api/products/products/updateproduct/${id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ProductName: productName,
            ProductPrice: parseFloat(productPrice),
            ProductBarcode: productBarcode
          })
        }
      );

      if (response.ok) {
        alert("Product updated successfully!");
        navigate('/products');
      } else {
        setError("Failed to update product");
      }
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6 dark:text-white">Edit Product</h1>

        {error && <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">{error}</div>}

        <form onSubmit={updateProduct} className="space-y-4">
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
              disabled={updating}
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
              disabled={updating}
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
              disabled={updating}
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
              disabled={updating}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}