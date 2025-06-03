import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://tastytreatsmakhana.onrender.com/api/orders/admin"
      );
      console.log(">>> raw orders:", data);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-16">
      <main className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 flex justify-center items-center gap-3">
          <span>📦</span> All Orders
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-800 text-white sticky top-0 z-10">
              <tr>
                {[
                  "Order ID",
                  "User",
                  "Product ID",
                  "Quantity",
                  "Payment Method",
                  "Email",
                  "Phone",
                  "Address",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr
                    key={order._id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    {/* Render the order’s own ID */}
                    <td className="py-3 px-6 text-sm text-gray-700 font-mono max-w-[150px] truncate">
                      {order._id}
                    </td>

                    {/* If your API returns a nested `user` object, use order.user.name */}
                    <td className="py-3 px-6 text-sm text-gray-700 max-w-[120px] truncate">
                      {order.user?.name || "—"} 
                    </td>

                    {/* Since productId is an object, choose one field (e.g. its _id or its name) */}
                    <td className="py-3 px-6 text-sm text-gray-700 font-mono max-w-[150px] truncate">
                      {order.productId?._id || "—"}
                      {/* or {order.productId?.name} if you prefer */}
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-700">
                      {order.quantity}
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-700 max-w-[130px] truncate">
                      {order.paymentMethod}
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-700 max-w-[180px] truncate">
                      {order.email}
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-700 max-w-[130px] truncate">
                      {order.phone}
                    </td>

                    <td className="py-3 px-6 text-sm text-gray-700 max-w-[250px] truncate">
                      {order.address}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-12 text-center text-gray-500 font-semibold"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;


