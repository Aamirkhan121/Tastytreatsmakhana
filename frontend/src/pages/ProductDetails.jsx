import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, Minus, Plus } from 'lucide-react';

const ProductDetails = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const descriptionText = `Celebrate this Navratri with guilt-free, crunchy, and delicious Tasty Crunch Roasted Makhana. Packed with flavor and nutrition.

Our Combo Pack of 3 brings you the perfect festive snacking experience at a special price!

Flavours
Himalayan salted
Creamy cheese
Black pepper

1 pack = 60 Grams`;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`https://api.tastycrunchmakhana.com/api/products/${slug}`);
        setProducts(res.data);
        setMainImage(res.data.image);
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [slug]);

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product: products,
        quantity: quantity,
        totalPrice: products.price * quantity
      }
    });
  };

  const increaseQuantity = () => setQuantity(q => q + 1);
  const decreaseQuantity = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const productPrice = products ? products.price * quantity : 0;
  const deliveryCharge = productPrice >= 500 ? 0 : 40;
  const totalPrice = productPrice + deliveryCharge;

  const thumbnails = products ? [products.image, ...(products.extraImages || [])] : [];

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Product – TastyCrunch Makhana</title>
          <meta name="description" content="Delicious roasted makhana is loading..." />
        </Helmet>
        <div className="flex flex-col justify-center items-center h-screen text-center text-xl text-gray-600">
          <h1 className="text-2xl font-bold mb-2">Loading Product...</h1>
          <p className="text-sm text-gray-500">Please wait while we fetch product details.</p>
        </div>
      </>
    );
  }

  if (!products) {
    return (
      <>
        <Helmet>
          <title>Product Not Found – TastyCrunch Makhana</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="flex justify-center items-center h-screen text-xl text-red-500">
          Product not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{products.name} – TastyCrunch Makhana</title>
        <meta name="description" content={products.description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: products.name,
            image: [products.image, ...(products.extraImages || [])],
            description: products.description,
            sku: slug,
            offers: {
              "@type": "Offer",
              priceCurrency: "INR",
              price: products.price,
              availability: "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>

      <motion.div
        className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-white font-[Poppins]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-80 sm:h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse -z-10"></div>

        <div className="container mx-auto px-4 py-16">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold text-center text-orange-700 mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {products.name}
          </motion.h2>

          <div className="backdrop-blur-xl bg-white/70 rounded-3xl shadow-2xl p-6 sm:p-10 max-w-7xl mx-auto">
            {/* Offer */}
            <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-green-100 via-green-200 to-green-100 text-green-800 text-center font-semibold shadow-inner">
              🎁 Get <span className="text-green-900 font-bold">FREE Delivery</span> on orders above ₹500!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              {/* Image Gallery */}
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

              {/* Product Info */}
              <motion.div
                className="space-y-6"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-3xl font-bold text-orange-600">₹{products.price}</p>
              <p className="text-lg text-gray-700 font-medium">{products.description}</p>
              <p className="text-lg text-gray-700 font-medium" style={{ whiteSpace: 'pre-line' }}>
        {descriptionText}
      </p>
                

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">(120 reviews)</span>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-md font-medium text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-orange-300 rounded-full overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-orange-100 px-3 py-1 text-xl font-bold text-orange-600 hover:bg-orange-200 transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-4 text-lg">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="bg-orange-100 px-3 py-1 text-xl font-bold text-orange-600 hover:bg-orange-200 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                {/* Total & Delivery */}
                <p className="text-lg font-semibold text-green-600">Total: ₹{totalPrice}</p>
                <p className="text-sm text-gray-700">
                  <strong>Delivery:</strong>{' '}
                  {deliveryCharge === 0 ? (
                    <span className="text-green-600 font-semibold">Free Delivery</span>
                  ) : (
                    <span className="text-red-500">₹40 Delivery Charge</span>
                  )}
                </p>

                {/* Highlights */}
                <div>
                  <h4 className="font-semibold text-gray-800 mt-4 mb-2">🔍 Highlights:</h4>
                  <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
                    <li>Rich in protein & fiber</li>
                    <li>Gluten-free, healthy snacking option</li>
                    <li>100% roasted, no artificial flavor</li>
                  </ul>
                </div>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  🛒 Buy Now
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetails;




