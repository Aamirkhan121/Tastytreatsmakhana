  import React from 'react';
  import { Link } from 'react-router-dom';
  import HomeSlider from './HomeSlider';
  import YouTubeFeed from '../components/YoutubeFeed';

  const Home = () => {
    const bestsellers = [
      {
        id: "6803580c62e16f0e6bc2b658",
        img: "https://res.cloudinary.com/ddg2abuue/image/upload/v1746073580/Screenshot_2025-05-01_095327_kvwqat.png",
        title: "Peri Peri Roasted Snack in Olive Oil (60g)",
        desc: "A spicy and flavorful delight that packs a punch!"
      },
      {
        id: "68031cfeeb5f443ef51cab12",
        img: "https://res.cloudinary.com/ddg2abuue/image/upload/v1746073580/Screenshot_2025-05-01_095211_jvwnuh.png",
        title: "Roasted Cream & Onion Snack | Gluten Free | Zero Trans Fat",
        desc: "Smooth, tangy & crunchy combo. Perfect for anytime snacking."
      },
      {
        id: "68031d81eb5f443ef51cab14",
        img: "https://res.cloudinary.com/ddg2abuue/image/upload/v1746073580/Screenshot_2025-05-01_095359_uhapen.png",
        title: "Himalayan Salted | 60g",
        desc: "Simple, crunchy & preservative-free. Lightly seasoned with Himalayan Salt."
      },
    ];

    return (
      <main className="bg-gradient-to-tr from-yellow-100 via-white to-amber-200 text-gray-800">

        {/* 🖼️ Hero Slider */}
        <HomeSlider />

        {/* 🌟 Welcome Section */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute top-0 left-0 w-60 h-60 bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse -z-10"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse -z-10"></div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-800 mb-6 drop-shadow-xl animate-fade-in-up">
            Welcome to Tasty Crunch
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-100">
            Healthy. Crunchy. Delicious. Try our premium roasted snacks!
          </p>
          <Link to="/products" aria-label="Explore Products">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 animate-fade-in-up delay-200">
              Explore Products
            </button>
          </Link>
        </section>

        {/* 🔥 Feature Highlights */}
        <section className="bg-white py-20 px-4 text-center">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
            {[
              { icon: "🍃", title: "100% Natural", desc: "Free from additives, preservatives, and junk." },
              { icon: "🔥", title: "Roasted to Perfection", desc: "Crunchy and light — never fried!" },
              { icon: "🌾", title: "Gluten-Free", desc: "Great for diet-conscious snackers." },
            ].map((feature, index) => (
              <div key={index} className="p-6 rounded-3xl border border-yellow-200 bg-gradient-to-br from-orange-50 via-white to-yellow-50 shadow-md hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-orange-700">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🥇 Bestsellers */}
        <section className="py-24 px-6 text-center bg-gradient-to-b from-white via-orange-50 to-yellow-100">
          <h2 className="text-4xl font-extrabold text-orange-700 mb-12 drop-shadow-md animate-fade-in-up">
            Our Bestsellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {bestsellers.map((item, i) => (
              <article key={i} className="bg-white border border-yellow-200 rounded-3xl shadow-xl hover:shadow-2xl p-6 transition duration-300 transform hover:-translate-y-1 animate-fade-in-up delay-100">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-56 object-cover rounded-2xl shadow-md hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </Link>
                <h3 className="text-xl font-bold mt-5 text-yellow-800">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

       {/* 📺 YouTube Section */}
        <section className="py-24 px-6 text-center bg-orange-50">
        <h2 className="text-4xl font-extrabold text-orange-700 mb-4 drop-shadow-md animate-fade-in-up">
          Watch Us On YouTube
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
          Discover our recipes, behind-the-scenes, and fun snack content!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          <YouTubeFeed />
            </div>
      </section>


        {/* 🎯 Call To Action */}
        <section className="bg-orange-600 text-white py-20 text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-fade-in-up">Join the Crunch Revolution!</h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-6 animate-fade-in-up delay-100">
            Be the first to know when we drop new flavors. Sign up and stay updated.
          </p>
          <Link to="/subscribe">
            <button className="bg-white text-orange-600 font-bold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-orange-100 transition animate-fade-in-up delay-200">
              Notify Me
            </button>
          </Link>
        </section>
      </main>
    );
  };

  export default Home;



