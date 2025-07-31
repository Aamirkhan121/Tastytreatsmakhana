import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([]); // product list
  const [loading, setLoading] = useState(true); // loading status
  const navigate = useNavigate();

  // 🖼️ Static image list (backend se image nahi le rahe)
  const staticImages = [
    'https://res.cloudinary.com/ddg2abuue/image/upload/v1751860996/front_yellow-Up_page-0001_peqxii.jpg',
    'https://res.cloudinary.com/ddg2abuue/image/upload/v1751860996/pink_front_page-0001_u7bfkv.jpg',
    'https://res.cloudinary.com/ddg2abuue/image/upload/v1751860996/blue_front_page-0001_uxxeec.jpg',
    'https://res.cloudinary.com/ddg2abuue/image/upload/v1751860997/grey_front_page-0001_bwc9ii.jpg',
    'https://res.cloudinary.com/ddg2abuue/image/upload/v1751859850/orange_front_page-0001_nomtqr.jpg',
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          'https://api.tastycrunchmakhana.com/api/products'
        );
        setProducts(data); // sirf name, description, price mil rahe hain
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false); // loading hatao
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to continue');
      return navigate('/login'); // agar login nahi hai toh login page pe bhej do
    }
    navigate('/checkout', { state: { product } }); // warna checkout pe jao
  };

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#ffb347] px-4 py-16 overflow-hidden font-[Poppins]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background design */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full blur-[120px] opacity-40 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[100px] opacity-40 -z-10 animate-pulse"></div>

      {/* Title */}
      <motion.h2
        className="text-5xl font-extrabold text-center text-orange-800 mb-14 drop-shadow-sm"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        🍿 Premium Makhana Collection
      </motion.h2>

      {/* Agar loading hai to spinner dikhao */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-80">
          <div className="w-12 h-12 border-4 border-dotted rounded-full border-orange-500 animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Fetching deliciousness...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {products.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">
              No products available.
            </p>
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product._id}
                className="bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="relative"
                  onClick={() => navigate(`/products/${product._id}`)}
                >
                  {/* Static image use ho rahi hai */}
                  <img
                    src={staticImages[index % staticImages.length]}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition duration-300 rounded-t-2xl"
                  />
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    Bestseller
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-orange-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-orange-700">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-4 py-1.5 text-sm font-semibold rounded-full shadow transition duration-300"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Products;
