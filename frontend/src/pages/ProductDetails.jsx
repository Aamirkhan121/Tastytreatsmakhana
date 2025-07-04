import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://tastytreatsmakhana.onrender.com/api/products/${productId}`);
        setProducts(response.data);
        setMainImage(response.data.image);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to continue");
      return navigate("/login");
    }
    navigate("/checkout", { state: { product: products } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600 animate-pulse">
        Loading product details...
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-500">
        Product not found.
      </div>
    );
  }

  const thumbnails = [products.image, ...(products.extraImages || [])];

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-white px-4 py-16 font-[Poppins]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🌈 Animated Background Blobs */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"></div>
      <div className="absolute bottom-0 -right-10 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse -z-10"></div>

      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center text-orange-700 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {products.name}
      </motion.h2>

      <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Product Image & Thumbnails */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src={mainImage}
              alt={products.name}
              className="w-full max-w-md rounded-2xl object-contain shadow-xl transition-transform duration-500 hover:scale-105"
            />

            <div className="flex flex-wrap justify-center gap-3">
              {thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setMainImage(img)}
                  className={`w-16 h-16 rounded-lg object-cover border-2 cursor-pointer hover:scale-105 transition-transform duration-200 ${
                    mainImage === img ? 'border-orange-500' : 'border-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            className="space-y-6"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-3xl font-bold text-orange-600">
              ₹{products.price}
            </p>

            <p className="text-lg text-gray-700 font-medium">
              {products.description}
            </p>

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-2">(120 reviews)</span>
            </div>

            <div className="text-base text-gray-600 space-y-1">
              <p><strong>Sold By:</strong> <span className="text-blue-600">MyBrand</span></p>
              <p><strong>Delivery:</strong> <span className="text-green-600 font-semibold">Free (2–3 days)</span></p>
              <p><strong>COD:</strong> Available</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mt-4 mb-2">🔍 Highlights:</h4>
              <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                <li>Rich in protein & fiber</li>
                <li>Gluten-free, healthy snacking option</li>
                <li>100% roasted, no artificial flavor</li>
              </ul>
            </div>

            <button
              onClick={handleBuyNow}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              🛒 Buy Now
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;

