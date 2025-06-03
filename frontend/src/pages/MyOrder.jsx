import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://tastytreatsmakhana.onrender.com/api/orders/my', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    const reason = window.prompt('Please enter the reason for cancellation:');
    if (!reason) {
      alert('Cancellation reason is required.');
      return;
    }

    try {
      setCancellingId(orderId);
      const token = localStorage.getItem('token');

      await axios.patch(
        `https://tastytreatsmakhana.onrender.com/api/orders/cancel/${orderId}`,
        { status: 'Cancelled', cancelReason: reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order cancelled successfully.');
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error('Failed to cancel order:', err);
      alert('Failed to cancel the order. Please try again.');
    } finally {
      setCancellingId(null);
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
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

              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <span className="font-medium">Quantity:</span> {order.quantity}
                </li>
                <li>
                  <span className="font-medium">Payment:</span> {order.paymentMethod}
                </li>
                <li>
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-0.5 rounded text-white ${
                      order.status === 'Delivered'
                        ? 'bg-green-500'
                        : order.status === 'Pending'
                        ? 'bg-yellow-500'
                        : order.status === 'Cancelled'
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                  >
                    {order.status}
                  </span>
                </li>
                <li>
                  <span className="font-medium">Date:</span>{' '}
                  {new Date(order.createdAt).toLocaleDateString()}
                </li>

                {/* Show cancel reason if order cancelled */}
                {order.status === 'Cancelled' && order.cancelReason && (
                  <li>
                    <span className="font-medium">Cancel Reason:</span> {order.cancelReason}
                  </li>
                )}
              </ul>

              {/* Cancel button - only if order not delivered or cancelled */}
              {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                <button
                  onClick={() => handleCancel(order._id)}
                  disabled={cancellingId === order._id}
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancellingId === order._id ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;
