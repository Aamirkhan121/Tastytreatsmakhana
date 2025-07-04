import React from 'react';
import { Link } from 'react-router-dom';
import HomeSlider from './HomeSlider';

const Home = () => {
  return (
    <div className="bg-gradient-to-tr from-yellow-100 via-white to-amber-200 text-gray-800">
      {/* Hero Section */}
      <HomeSlider />

      <section className="relative bg-gradient-to-br from-yellow-50 to-orange-100 py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-60 h-60 bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse -z-10"></div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-800 mb-6 drop-shadow-xl animate-fade-in-up">
          Welcome to Tasty Crunch Makhana
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-100">
          Healthy. Crunchy. Delicious. Try our premium roasted Makhana snacks!
        </p>
        <Link to="/products">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 animate-fade-in-up delay-200">
            Explore Products
          </button>
        </Link>
      </section>

      {/* Bestsellers Section */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-white via-orange-50 to-yellow-100">
        <h2 className="text-4xl font-extrabold text-orange-700 mb-12 drop-shadow-md animate-fade-in-up">
          Our Bestsellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Product 1 */}
          <div className="bg-white border border-yellow-200 rounded-3xl shadow-xl hover:shadow-2xl p-6 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up">
            <img
              src="https://res.cloudinary.com/ddg2abuue/image/upload/v1746073580/Screenshot_2025-05-01_095327_kvwqat.png"
              alt="Peri Peri Makhana"
              className="w-full h-56 object-cover rounded-2xl shadow-md"
            />
            <h3 className="text-xl font-bold mt-5 text-yellow-800">
              Farmley Peri Peri Roasted Makhana in Olive Oil (60g)
            </h3>
            <p className="text-gray-600 mt-2">
              A spicy and flavorful delight that packs a punch!
            </p>
          </div>

          {/* Product 2 */}
          <div className="bg-white border border-yellow-200 rounded-3xl shadow-xl hover:shadow-2xl p-6 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up delay-100">
            <img
              src="https://res.cloudinary.com/ddg2abuue/image/upload/v1746073580/Screenshot_2025-05-01_095211_jvwnuh.png"
              alt="Cream & Onion Makhana"
              className="w-full h-56 object-cover rounded-2xl shadow-md"
            />
            <h3 className="text-xl font-bold mt-5 text-yellow-800">
              Roasted Cream & Onion Makhana | Gluten Free | Zero Trans Fat
            </h3>
            <p className="text-gray-600 mt-2">
              Smooth, tangy & crunchy combo. Perfect for anytime snacking.
            </p>
          </div>

          {/* Product 3 */}
          <div className="bg-white border border-yellow-200 rounded-3xl shadow-xl hover:shadow-2xl p-6 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up delay-200">
            <img
              src="https://res.cloudinary.com/ddg2abuue/image/upload/v1746073580/Screenshot_2025-05-01_095359_uhapen.png"
              alt="Himalayan Salted"
              className="w-full h-56 object-cover rounded-2xl shadow-md"
            />
            <h3 className="text-xl font-bold mt-5 text-yellow-800">
              Himalayan Salted | 60g
            </h3>
            <p className="text-gray-600 mt-2">
              Simple, crunchy & preservative-free. Lightly seasoned with Himalayan Salt.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

