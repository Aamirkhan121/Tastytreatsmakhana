// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const product = location.state?.product;

//   const [address, setAddress] = useState('');
//   const token = localStorage.getItem('token');

//   const handlePlaceOrder = async () => {
//     if (!token) return toast.error('Please log in first');

//     try {
//       await axios.post(
//         '/api/orders/create',
//         {
//           productId: product._id,
//           address,
//           quantity: 1,
//           paymentMethod: 'COD',
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success('Order placed with Cash on Delivery!');
//       navigate('/products');
//     } catch (err) {
//       toast.error('Failed to place order');
//     }
//   };

//   const handleOnlinePayment = async () => {
//     if (!token) return toast.error('Please log in first');

//     const res = await loadRazorpayScript();
//     if (!res) {
//       toast.error('Razorpay SDK failed to load.');
//       return;
//     }

//     try {
//       // Create order on backend
//       const orderResponse = await axios.post(
//         '/api/payment/order',
//         { 
//           amount: product.price * 100, // amount in paise
//           currency: 'INR',
//           receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const order = orderResponse.data;

//       const options = {
//         key: 'rzp_test_0ors0RHmicSm9m', // 🔑 Replace with your Razorpay Key ID
//         amount: order.amount,
//         currency: order.currency,
//         name: 'Tasty Crunch',
//         description: 'Product Payment',
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             await axios.post(
//               '/api/orders/create',
//               {
//                 productId: product._id,
//                 address,
//                 quantity: 1,
//                 paymentMethod: 'Online',
//                 paymentInfo: {
//                   id: response.razorpay_payment_id,
//                   order_id: response.razorpay_order_id,
//                   signature: response.razorpay_signature,
//                 },
//               },
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );
//             toast.success('Payment successful and order placed!');
//             navigate('/products');
//           } catch (error) {
//             toast.error('Order placement failed after payment');
//           }
//         },
//         prefill: {
//           name: 'Md Aamir Khan',
//           email: 'aamir73690@gmail.com',
//           contact: '9999999999',
//         },
//         theme: {
//           color: '#f97316',
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       toast.error('Payment initiation failed');
//     }
//   };

//   if (!product) return <p>No product found.</p>;

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
//       <p className="mb-2"><strong>Product:</strong> {product.name}</p>
//       <p className="mb-4"><strong>Price:</strong> ₹{product.price}</p>

//       <textarea
//         placeholder="Enter delivery address"
//         className="w-full border rounded p-2 mb-4"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       ></textarea>

//       <div className="flex gap-4">
//         <button
//           className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
//           onClick={handlePlaceOrder}
//         >
//           Cash on Delivery
//         </button>

//         <button
//           className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
//           onClick={handleOnlinePayment}
//         >
//           Pay Online
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
 
