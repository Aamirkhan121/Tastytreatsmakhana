import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://tastytreatsmakhana.onrender.com/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`https://tastytreatsmakhana.onrender.com/api/products/delete/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gray-50 mt-16 border-t border-gray-200">
      <div className="flex justify-between items-center mb-6 px-4 py-2 bg-white shadow-md rounded-lg ">
        <h1 className="text-3xl font-bold text-gray-800 mb-[80]">📦 Product Management</h1>
        <Link
          to="/admin/products/new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition"
        >
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 border flex flex-col"
            >
              <div className="w-full h-56 overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-600">
                    {product.description?.slice(0, 80)}...
                  </p>
                  <p className="mt-2 text-lg font-bold text-green-600">
                    ₹{product.price}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    <FiEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
