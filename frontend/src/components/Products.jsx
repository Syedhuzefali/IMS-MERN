import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { buildApiUrl } from "../config/api";

export default function Products() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(buildApiUrl("/api/products/products"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setProductData(data);
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      setError("Error: " + err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = productData.filter((product) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return true;
    }

    const productName = (product.ProductName || "").toLowerCase();
    const productBarcode = String(product.ProductBarcode || "").toLowerCase();

    return productName.includes(query) || productBarcode.includes(query);
  });

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        buildApiUrl(`/api/products/products/deleteproduct/${id}`),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Product deleted successfully!");
        getProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error: " + err.message);
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Products</h1>
          <NavLink
            to="/insertproduct"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Add Product
          </NavLink>
        </div>

        {error && <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-3 rounded mb-4">{error}</div>}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Search Products
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or barcode..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-gray-700 dark:text-white"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Showing {filteredProducts.length} of {productData.length} products
          </p>
        </div>

        {productData.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No products found</p>
            <NavLink
              to="/insertproduct"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add First Product
            </NavLink>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No matching products found for "{searchTerm}"
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold dark:text-white">#</th>
                  <th className="px-4 py-3 text-left font-semibold dark:text-white">Product Name</th>
                  <th className="px-4 py-3 text-left font-semibold dark:text-white">Price</th>
                  <th className="px-4 py-3 text-left font-semibold dark:text-white">Barcode</th>
                  <th className="px-4 py-3 text-left font-semibold dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3 dark:text-gray-300">{index + 1}</td>
                    <td className="px-4 py-3 dark:text-gray-300">{product.ProductName}</td>
                    <td className="px-4 py-3 dark:text-gray-300">${product.ProductPrice}</td>
                    <td className="px-4 py-3 dark:text-gray-300">{product.ProductBarcode}</td>
                    <td className="px-4 py-3 flex gap-2">
                      <NavLink
                        to={`/updateproduct/${product._id}`}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
