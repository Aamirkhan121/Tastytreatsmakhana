// src/pages/Subscribe.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const Subscribe = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-orange-100 flex items-center justify-center px-4 py-12">
      {/* ✅ SEO */}
      <Helmet>
        <title>Subscribe | Tasty Crunch</title>
        <meta name="description" content="Subscribe to get updates on the latest tasty snacks, launches, and exclusive deals from Tasty Crunch!" />
        <meta name="keywords" content="Subscribe, Newsletter, Tasty Crunch, Snacks, Updates" />
        <meta name="author" content="Tasty Crunch" />
      </Helmet>

      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold text-orange-700 mb-4">Coming Soon!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Our subscription service is almost here. Be the first to know when we launch!
        </p>

        {/* Optional future email input */}
        <div className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-full border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            disabled
          />
          <button
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-md cursor-not-allowed"
            disabled
          >
            Notify Me (Coming Soon)
          </button>
        </div>
      </motion.div>
    </main>
  );
};

export default Subscribe;
