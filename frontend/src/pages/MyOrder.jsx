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
        { status: 'Cancelled', cancellationReason: reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Order cancelled successfully.');
      fetchOrders();
    } catch (err) {
      console.error('Failed to cancel order:', err);
      alert('Failed to cancel the order. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gradient-to-br from-yellow-50 to-orange-100">
        <p className="text-lg font-semibold animate-pulse text-orange-700">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gradient-to-br from-yellow-100 to-orange-200 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-orange-700 mb-10 shadow-sm">
        📦 My Order Summary
      </h1>

      {orders.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-lg border border-orange-100 p-6 transition-transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center space-x-4 mb-4">
               
                <div>
                  <h2 className="text-xl font-semibold text-orange-600">
                    {order.productId?.name || 'Unknown Product'}
                  </h2>
                  <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                </div>
              </div>

              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  <span className="font-medium">Payment:</span> {order.paymentMethod}
                </li>
                <li>
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`px-2 py-0.5 rounded text-white text-xs font-semibold tracking-wide ml-1 ${
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

                {order.status === 'Cancelled' && order.cancellationReason && (
                  <li>
                    <span className="font-medium">Cancel Reason:</span> {order.cancellationReason}
                  </li>
                )}
              </ul>

              {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                <button
                  onClick={() => handleCancel(order._id)}
                  disabled={cancellingId === order._id}
                  className="mt-5 w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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


