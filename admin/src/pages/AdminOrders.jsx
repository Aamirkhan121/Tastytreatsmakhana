import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://api.tastycrunchmakhana.com/api/orders/admin"
      );
      setOrders(data);
      console.log("Fetched orders:", data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 📌 Download Invoice as PDF
  const downloadInvoice = (order) => {
    const invoice = document.createElement("div");
    invoice.style.padding = "25px";
    invoice.style.width = "700px";
    invoice.style.fontFamily = "Arial, sans-serif";
    invoice.innerHTML = `
      <div style="text-align:center; margin-bottom:20px;">
        <h1 style="color:#2563eb; margin:0;">TastyCrunch Makhana</h1>
        <p style="margin:0; font-size:12px; color:#555;">Order Invoice</p>
        <hr style="margin-top:15px; border:1px solid #ddd;" />
      </div>

      <h3 style="margin:10px 0; color:#2563eb;">Customer Details</h3>
      <p><b>Name:</b> ${order.name}</p>
      <p><b>Email:</b> ${order.email}</p>
      <p><b>Phone:</b> ${order.phone}</p>
      <p><b>Address:</b> ${order.address}</p>
      


      <h3 style="margin:15px 0; color:#2563eb;">Order Details</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Order ID</th>
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Product</th>
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Qty</th>
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Payment</th>
            <th style="border:1px solid #ddd; padding:8px; text-align:left;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #ddd; padding:8px;">${order.orderId || order._id}</td>
            <td style="border:1px solid #ddd; padding:8px;">${order.productId?.name || "N/A"}</td>
            <td style="border:1px solid #ddd; padding:8px;">${order.quantity}</td>
            <td style="border:1px solid #ddd; padding:8px;">${order.paymentMethod}</td>
            <td style="border:1px solid #ddd; padding:8px;">${order.status || "Confirmed"}</td>
          </tr>
        </tbody>
      </table>

      <p><b>Order Date:</b> ${new Date(order.createdAt).toLocaleDateString()}</p>

      <div style="margin-top:30px; text-align:center; font-size:12px; color:#666;">
        <p>Thank you for shopping with TastyCrunch Makhana! 🙏</p>
      </div>
    `;

    document.body.appendChild(invoice);

    html2canvas(invoice).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save(`invoice_${order.orderId || order._id}.pdf`);
      document.body.removeChild(invoice);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 mt-16">
      <main className="bg-white rounded-2xl shadow-xl w-full max-w-7xl p-8">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800 flex justify-center items-center gap-3">
          <span>📦</span> All Orders
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-blue-800 text-white sticky top-0 z-10">
              <tr>
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Qty",
                  "Price",
                  "Payment",
                  "Email",
                  "Phone",
                  "Address",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-6 text-left font-semibold uppercase tracking-wide"
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
                    className={`hover:bg-blue-50 transition ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-6 font-mono max-w-[150px] truncate text-gray-700">
                  {order.orderId || order._id}
                  </td>
                    <td className="py-3 px-6 text-gray-700">{order.name}</td>
                    <td className="py-3 px-6 text-gray-700">
                      {order.productId?.name || "—"}
                    </td>
                    <td className="py-3 px-6 text-gray-700">{order.quantity}</td>
                    <td className="py-3 px-6 text-gray-700">₹{order.price || "—"}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.paymentMethod === "COD"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-gray-700">{order.email}</td>
                    <td className="py-3 px-6 text-gray-700">{order.phone}</td>
                    <td className="py-3 px-6 text-gray-700 max-w-[250px] truncate">
                      {order.address}
                    </td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => downloadInvoice(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow"
                      >
                        Download Invoice
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
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




