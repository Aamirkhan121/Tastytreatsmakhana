import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading...
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

  const handleBuyNow = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please login to continue");
    return navigate("/login");
  }

  navigate("/checkout", { state: { product: products } });
};

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        {products.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md flex justify-center mb-6">
            <img
              src={mainImage}
              alt={products.name}
              className="w-full h-auto object-contain rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          {/* Thumbnail Section */}
          <div className="flex flex-wrap justify-center gap-4">
            {thumbnails.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  mainImage === img ? 'border-4 border-yellow-500' : ''
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-3xl font-semibold text-yellow-600">
              ₹{products.price}
            </p>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            {products.description}
          </p>

          <div className="text-gray-600">
            <p className="font-semibold">Sold By: <span className="text-blue-600">MyBrand</span></p>
            <p className="text-sm">Free Delivery: <span className="text-green-600 font-semibold">In 2-3 days</span></p>
            <p className="text-sm">Cash on Delivery Available</p>
          </div>

          <div className="space-x-4">
            {/* <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full shadow-md transition duration-300">
              Add to Cart
            </button> */}
             <button
                       onClick={handleBuyNow}
                      className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-full transition duration-200"
                    >
                      Buy Now
                    </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
