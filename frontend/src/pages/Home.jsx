import React from 'react';
import { Link } from 'react-router-dom';
import HomeSlider from './HomeSlider';

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <HomeSlider />

      <section className="bg-yellow-100 py-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-800 mb-6">
          Welcome to Tasty Crunch Makhana
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
          Healthy. Crunchy. Delicious. Try our premium roasted Makhana snacks!
        </p>
        <Link to="/products">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-md hover:shadow-lg transition duration-300">
            Explore Products
          </button>
        </Link>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Our Bestsellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* Product 1 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg hover:shadow-2xl p-6 transition duration-300">
            <img
              src="/Per_Peri.webp"
              alt="Peri Peri Makhana"
              className="w-full h-56 object-cover rounded-xl"
            />
            <h3 className="text-xl font-semibold mt-5 text-yellow-800">
              Farmley Peri Peri Roasted Makhana in Olive Oil (77g)
            </h3>
            <p className="text-gray-600 mt-2">A spicy and flavorful delight!</p>
          </div>

          {/* Product 2 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg hover:shadow-2xl p-6 transition duration-300">
            <img
              src="/Cream_onion.webp"
              alt="Cream & Onion Makhana"
              className="w-full h-56 object-cover rounded-xl"
            />
            <h3 className="text-xl font-semibold mt-5 text-yellow-800">
              Roasted Cream & Onion Makhana | Gluten Free | Zero Trans Fat
            </h3>
            <p className="text-gray-600 mt-2">Smooth, tangy & crunchy combo.</p>
          </div>

          {/* Product 3 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl shadow-lg hover:shadow-2xl p-6 transition duration-300">
            <img
              src="/Vedaka_fox.webp"
              alt="Vedaka Fox Nuts"
              className="w-full h-56 object-cover rounded-xl"
            />
            <h3 className="text-xl font-semibold mt-5 text-yellow-800">
              Vedaka Phool Makhana | 200g | No Artificial Flavours
            </h3>
            <p className="text-gray-600 mt-2">Simple, crunchy, and preservative-free.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

