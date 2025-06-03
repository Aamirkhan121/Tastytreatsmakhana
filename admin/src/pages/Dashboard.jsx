import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [counts, setCounts] = useState({ users: 0, orders: 0, products: 0 });

  const API = {
    users: "https://tastytreatsmakhana.onrender.com/api/users/allusers",
    orders: "https://tastytreatsmakhana.onrender.com/api/orders/admin",
    products: "https://tastytreatsmakhana.onrender.com/api/products",
  };

  const fetchData = async (key, url) => {
    try {
      const { data } = await axios.get(url);
      setCounts((prev) => ({ ...prev, [key]: data.length }));
    } catch (err) {
      console.error(`Error fetching ${key}:`, err);
    }
  };

  useEffect(() => {
    fetchData("users", API.users);
    fetchData("orders", API.orders);
    fetchData("products", API.products);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 md:mt-16 sm:mt-20 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Page Title */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Here’s a quick summary of your platform activity.
          </p>
        </header>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
          {/* Users Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center hover:shadow-indigo-500 transition-shadow duration-300">
            <div className="bg-indigo-100 rounded-full p-4 mb-4">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A10.967 10.967 0 0112 15c2.7 0 5.195 1.057 7.071 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="mt-2 text-4xl font-bold text-indigo-600">{counts.users}</p>
          </div>

          {/* Orders Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center hover:shadow-green-500 transition-shadow duration-300">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h1l1 2h13l1-2h1M6 21h12a2 2 0 002-2v-7H4v7a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="mt-2 text-4xl font-bold text-green-600">{counts.orders}</p>
          </div>

          {/* Products Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center hover:shadow-yellow-500 transition-shadow duration-300">
            <div className="bg-yellow-100 rounded-full p-4 mb-4">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 12H4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20l-8-8 8-8"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="mt-2 text-4xl font-bold text-yellow-600">{counts.products}</p>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">📝 Recent Activity</h3>
          <ul className="space-y-4 text-gray-700 text-lg list-disc list-inside">
            <li>✔️ New product added: "Spicy Makhana"</li>
            <li>🛒 Order #125 placed by Aman</li>
            <li>👤 New user registered: Riya</li>
            <li>💰 Payment received: ₹999 for Order #124</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;



