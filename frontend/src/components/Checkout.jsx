// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const token = localStorage.getItem("token");
//   const cartAmount = location.state?.totalAmount || 0;

//   const [formData, setFormData] = useState({
//     name: user.name || "",
//     email: user.email || "",
//     phone: "",
//     amount: cartAmount || "",
//     paymentMethod: "online",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     const { name, email, phone, amount, paymentMethod } = formData;

//     if (!amount || amount <= 0) {
//       toast.error("Invalid amount");
//       return;
//     }

//     if (paymentMethod === "cod") {
//       toast.success("Order placed with Cash on Delivery");
//       try {
//         await axios.post(
//           "/api/order/cod",
//           { name, email, phone, amount },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         navigate("/my-orders");
//       } catch (err) {
//         toast.error("Failed to place COD order");
//       }
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         "/api/phonepe/pay",
//         { name, email, phone, amount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (data?.url) {
//         window.location.href = data.url;
//       } else {
//         toast.error("Failed to get payment link");
//       }
//     } catch (error) {
//       toast.error("Payment failed");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-orange-50 flex items-center justify-center py-10 px-4">
//       <form
//         onSubmit={handlePayment}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg space-y-5"
//       >
//         <h2 className="text-3xl font-bold text-orange-700 text-center">Checkout</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           required
//           className="w-full border p-2 rounded"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email"
//           required
//           className="w-full border p-2 rounded"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Your Phone"
//           required
//           className="w-full border p-2 rounded"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           required
//           className="w-full border p-2 rounded"
//           value={formData.amount}
//           onChange={handleChange}
//         />

//         <div className="flex gap-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="online"
//               checked={formData.paymentMethod === "online"}
//               onChange={handleChange}
//             />
//             Online Payment (PhonePe)
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="paymentMethod"
//               value="cod"
//               checked={formData.paymentMethod === "cod"}
//               onChange={handleChange}
//             />
//             Cash on Delivery
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-lg font-semibold"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Checkout;

