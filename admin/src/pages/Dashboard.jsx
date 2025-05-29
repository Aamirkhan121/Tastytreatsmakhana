import React, { useEffect, useState } from "react";
import axios from "axios";


const Dashboard = () => {

    const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("https://tastytreatsmakhana.onrender.com/api/users/allusers");
        setUserCount(data.length);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="p-6 mt-20">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📊 Admin Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">128</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">58</p>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{userCount}</p>
        </div>
      </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold text-red-500 mt-2">₹34,560</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">📝 Recent Activity</h3>
        <ul className="space-y-3 text-gray-600">
          <li>✔️ New product added: "Spicy Makhana"</li>
          <li>🛒 Order #125 placed by Aman</li>
          <li>👤 New user registered: Riya</li>
          <li>💰 Payment received: ₹999 for Order #124</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

