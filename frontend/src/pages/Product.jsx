import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { authHeaders } from "../../utils/api";
import { useCart } from "../../context/CartContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { addToCart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`https://api.tastycrunchmakhana.com/api/products`);
        setProducts(data);
      } catch (e) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

 const handleAddToCart = async (product) => {
  addToCart({
    productId: String(product._id),  // ✅ id ki jagah productId
    name: product.name,
    price: product.price,
    image: product.image,
  });

  // Agar user logged in hai → backend sync bhi karna
  if (token) {
    try {
      await axios.post(
        `https://api.tastycrunchmakhana.com/api/cart/add`,
        {
          product: {
            productId: String(product._id),
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        },
        { headers: authHeaders() }
      );
    } catch (err) {
      toast.error("Failed to sync with server");
    }
  }

  toast.success(`${product.name} added to cart`);
};


  const handleBuyNow = (product) => navigate("/checkout", { state: { product } });

  return (
    <motion.div className="min-h-screen px-4 py-16">
      {loading ? (
        <div className="flex items-center justify-center h-80">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="bg-white rounded-2xl shadow"
            >
              <div onClick={() => navigate(`/products/${product.slug}`)} className="cursor-pointer">
                <img src={product.image} alt={product.name} className="w-full object-cover rounded-t-2xl" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-1 text-sm line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">₹{product.price}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleAddToCart(product)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full">
                      Add to Cart
                    </button>
                    <button onClick={() => handleBuyNow(product)} className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-full">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Products;
