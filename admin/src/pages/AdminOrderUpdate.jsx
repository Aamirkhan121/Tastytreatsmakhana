import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrderUpdate = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [editedStatuses, setEditedStatuses] = useState({});

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.tastycrunchmakhana.com/api/orders/admin'
      );
      setOrders(response.data);

      // Initialize editedStatuses with current order statuses
      const initialStatuses = {};
      response.data.forEach((order) => {
        initialStatuses[order._id] = order.status;
      });
      setEditedStatuses(initialStatuses);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update the status of a specific order
  const handleStatusUpdate = async (orderId) => {
    try {
      setUpdatingId(orderId);
      const newStatus = editedStatuses[orderId];
      await axios.patch(
        `https://tastytreatsmakhana.onrender.com/api/orders/admin/update/${orderId}`,
        { status: newStatus }
      );
      await fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin – Manage All Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {order.productId?.image && (
                <img
                  src={order.productId.image}
                  alt={order.productId.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              <h2 className="text-lg font-semibold text-indigo-600 mb-2">
                {order.productId?.name || 'Unknown Product'}
              </h2>

              <p className="text-sm text-gray-500 mb-2 break-all">
                <span className="font-medium">Order ID:</span> {order._id}
              </p>

              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>
                  <span className="font-medium">User ID:</span> {order.userId}
                </li>
                <li>
                  <span className="font-medium">Quantity:</span> {order.quantity}
                </li>
                <li>
                  <span className="font-medium">Payment:</span> {order.paymentMethod}
                </li>
                <li>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </li>
              </ul>

              {/* Status Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status:
                </label>
                <select
                  value={editedStatuses[order._id] || order.status}
                  onChange={(e) =>
                    setEditedStatuses({
                      ...editedStatuses,
                      [order._id]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processed">Processed</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  {/* Add more status options as needed */}
                </select>
              </div>

              {/* Save Button */}
              <button
                onClick={() => handleStatusUpdate(order._id)}
                disabled={updatingId === order._id}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updatingId === order._id ? 'Saving...' : 'Save'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderUpdate;

