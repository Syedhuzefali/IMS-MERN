import React, { useState, useEffect } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { buildApiUrl } from "../config/api";
import { getAuthToken, isUserLoggedIn } from "../services/authService";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBarcode, setProductBarcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/login");
      return;
    }
    fetchProductDetail();
  }, [id, navigate]);

  const fetchProductDetail = async () => {
    setFetching(true);
    try {
      const token = getAuthToken();

      const response = await fetch(buildApiUrl(`/api/products/${id}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const product = await response.json();
        setProductName(product.ProductName);
        setProductPrice(product.ProductPrice);
        setProductBarcode(product.ProductBarcode);
      } else if (response.status === 401) {
        setError("Session expired. Please login again.");
        navigate("/login");
      } else {
        setError("Failed to load product details");
      }
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!productName.trim()) {
      setError("Product name is required");
      return;
    }

    if (!productPrice || productPrice <= 0) {
      setError("Product price must be greater than 0");
      return;
    }

    if (!productBarcode.trim()) {
      setError("Product barcode is required");
      return;
    }

    if (productBarcode.length < 6) {
      setError("Barcode must be at least 6 digits");
      return;
    }

    if (productBarcode.length > 12) {
      setError("Barcode cannot exceed 12 digits");
      return;
    }

    setLoading(true);

    try {
      const token = getAuthToken();

      const response = await fetch(
        buildApiUrl(`/api/products/updateproduct/${id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            ProductName: productName.trim(),
            ProductPrice: parseFloat(productPrice),
            ProductBarcode: parseFloat(productBarcode)
          })
        }
      );

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/products");
      } else if (response.status === 401) {
        setError("Session expired. Please login again.");
        navigate("/login");
      } else if (response.status === 422) {
        setError("Product with this barcode already exists");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update product");
      }
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Update Product
          </h1>

          {error && (
            <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded mb-4 border border-red-400 dark:border-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdateProduct}>
            <div className="mb-4">
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
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Product Price *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
                disabled={loading}
                required
              />
            </div>

            <div className="mb-6">
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
                required
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {productBarcode.length}/12 digits (Minimum 6 required)
              </p>
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
                disabled={loading || !productName.trim() || !productPrice || productBarcode.length < 6}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}