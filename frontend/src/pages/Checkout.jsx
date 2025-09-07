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
 //   const Checkout = () => {
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

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const token = localStorage.getItem('token');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePlaceOrder = async () => {
//     if (!token) return toast.error('Please log in first');

//     const { name, email, phone, address } = formData;
//     if (!name || !email || !phone || !address) {
//       return toast.error('Please fill all fields');
//     }

//     try {
//       await axios.post(
//         '/api/orders/create',
//         {
//           productId: product._id,
//           quantity: 1,
//           name,
//           email,
//           phone,
//           address,
//           paymentMethod: 'COD',
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
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

//     const { name, email, phone, address } = formData;
//     if (!name || !email || !phone || !address) {
//       return toast.error('Please fill all fields');
//     }

//     const res = await loadRazorpayScript();
//     if (!res) return toast.error('Razorpay SDK failed to load');

//     try {
//       const orderResponse = await axios.post(
//         '/api/payment/order',
//         {
//           amount: product.price * 100,
//           currency: 'INR',
//           receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const order = orderResponse.data;

//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_0ors0RHmicSm9m',
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
//                 quantity: 1,
//                 name,
//                 email,
//                 phone,
//                 address,
//                 paymentMethod: 'Online',
//                 paymentInfo: {
//                   id: response.razorpay_payment_id,
//                   order_id: response.razorpay_order_id,
//                   signature: response.razorpay_signature,
//                 },
//               },
//               {
//                 headers: { Authorization: `Bearer ${token}` },
//               }
//             );
//             toast.success('Payment successful and order placed!');
//             navigate('/products');
//           } catch (error) {
//             toast.error('Order placement failed after payment');
//           }
//         },
//         prefill: { name, email, contact: phone },
//         theme: { color: '#f97316' },
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

//       <input
//         type="text"
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//         className="w-full border rounded p-2 mb-2"
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         className="w-full border rounded p-2 mb-2"
//       />
//       <input
//         type="tel"
//         name="phone"
//         placeholder="Phone Number"
//         value={formData.phone}
//         onChange={handleChange}
//         className="w-full border rounded p-2 mb-2"
//       />
//       <textarea
//         name="address"
//         placeholder="Address"
//         value={formData.address}
//         onChange={handleChange}
//         className="w-full border rounded p-2 mb-4"
//       />

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

 // src/components/Checkout.jsx
// src/pages/Checkout.jsx
// src/pages/Checkout.jsx
import React, { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE, authHeaders } from "../../utils/api";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Modes:
  // - Single: state.product provided
  // - Cart:   state.mode === "cart" and state.cartItems provided
  const product = state?.product || null;
  const cartItems = state?.mode === "cart" ? (state?.cartItems || []) : [];
  const isCartMode = !!cartItems.length;

  const [quantity, setQuantity] = useState(state?.quantity || 1);
  const [formData, setFormData] = useState(state?.formData || {
    name: "", email: "", phone: "", address: ""
  });

  const baseSubTotal = useMemo(() => {
    if (isCartMode) {
      return cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);
    }
    return (product?.price || 0) * quantity;
  }, [isCartMode, cartItems, product, quantity]);

  const deliveryCharge = useMemo(() => {
    if (isCartMode) return baseSubTotal >= 500 ? 0 : 40;
    return quantity >= 4 ? 0 : 40;
  }, [isCartMode, baseSubTotal, quantity]);

  const baseTotalPrice = baseSubTotal + deliveryCharge;
  const onlineDiscountTotal = Math.round(baseTotalPrice * 0.95);
  const isCODDisabled = baseTotalPrice < 500; // matches button subtitle

  if (!isCartMode && !product) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 mb-4">No product selected.</p>
        <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
          Go to Products
        </Link>
      </div>
    );
  }

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to place your order");
      navigate("/login", { state: { from: "/checkout", ...state } });
      return false;
    }
    return true;
  };

  // ==== COD ====
  const handlePlaceOrder = async () => {
    if (!checkLogin()) return;
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) return toast.error("Please fill all fields");
    if (isCODDisabled) return toast.error("COD available only for orders above ₹500");

    try {
      if (isCartMode) {
        // cart → send items array
        const items = cartItems.map(it => ({ productId: it.productId, quantity: it.quantity }));
        await axios.post(`https://api.tastycrunchmakhana.com/api/orders/create`, {
          items, name, email, phone, address, paymentMethod: "COD"
        }, { headers: authHeaders() });
      } else {
        // single product
        await axios.post(`https://api.tastycrunchmakhana.com/api/orders/create`, {
          productId: product._id,
          quantity,
          name, email, phone, address,
          paymentMethod: "COD",
        }, { headers: authHeaders() });
      }
      toast.success("Order placed with Cash on Delivery!");
      navigate("/my-orders");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to place order");
    }
  };

  // ==== Online ====
  const handleOnlinePayment = async () => {
    if (!checkLogin()) return;
    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) return toast.error("Please fill all fields");

    const res = await loadRazorpayScript();
    if (!res) return toast.error("Razorpay SDK failed to load");

    try {
      // Create Razorpay order on your server (amount in paise)
      const amountToPay = onlineDiscountTotal * 100;
      const orderResponse = await axios.post(`https://api.tastycrunchmakhana.com/api/payment/order`, {
        amount: amountToPay, currency: "INR", receipt: `rcpt_${Date.now()}`
      }, { headers: authHeaders() });

      const rpOrder = orderResponse.data; // { id, amount, currency }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_live_KoIZrsBfMnwNHj",
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        name: "Tasty Crunch",
        description: isCartMode ? "Cart Payment" : "Product Payment",
        order_id: rpOrder.id,
        handler: async function (response) {
          try {
            if (isCartMode) {
              const items = cartItems.map(it => ({ productId: it.productId, quantity: it.quantity }));
              await axios.post(`https://api.tastycrunchmakhana.com/api/orders/create`, {
                items,
                name, email, phone, address,
                paymentMethod: "Online",
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                },
              }, { headers: authHeaders() });
            } else {
              await axios.post(`https://api.tastycrunchmakhana.com/api/orders/create`, {
                productId: product._id,
                quantity,
                name, email, phone, address,
                paymentMethod: "Online",
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                },
              }, { headers: authHeaders() });
            }
            toast.success("Payment successful!");
            navigate("/my-orders");
          } catch (e) {
            toast.error("Order placement failed after payment");
          }
        },
        prefill: { name, email, contact: phone },
        theme: { color: "#f97316" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">🛒 Checkout</h1>

        {/* Summary */}
        <div className="flex flex-col gap-4 mb-6">
          {isCartMode ? (
            <div className="space-y-3">
              {cartItems.map((it) => (
                <div key={it.productId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={it.image} alt={it.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold">{it.name}</p>
                      <p className="text-sm text-gray-600">₹{it.price} × {it.quantity}</p>
                    </div>
                  </div>
                  <div className="font-semibold">₹{it.price * it.quantity}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">₹{product.price} / item</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="bg-gray-200 px-3 py-1 rounded-l text-lg">−</button>
                  <span className="px-4 text-lg">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className="bg-gray-200 px-3 py-1 rounded-r text-lg">+</button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-3 border-t">
            <p className="font-medium">Subtotal: ₹{baseSubTotal}</p>
            <p className="font-medium">Delivery: ₹{deliveryCharge}</p>
            <p className="font-semibold text-green-700">Online (5% OFF): ₹{onlineDiscountTotal}</p>
            <p className="text-xl font-bold text-orange-700 mt-2">Total: ₹{baseTotalPrice}</p>
          </div>
        </div>

        {/* Address form */}
        <div className="space-y-4">
          <input name="name" placeholder="Full Name" value={formData.name} onChange={onChange} className="w-full border rounded-lg p-3" />
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={onChange} className="w-full border rounded-lg p-3" />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={onChange} className="w-full border rounded-lg p-3" />
          <textarea name="address" placeholder="Shipping Address" rows="3" value={formData.address} onChange={onChange} className="w-full border rounded-lg p-3" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
          <button
            disabled={isCODDisabled}
            onClick={handlePlaceOrder}
            className={`w-full md:w-auto px-6 py-3 rounded-full ${isCODDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white font-semibold"}`}
          >
            <div className="flex flex-col items-center leading-tight">
              <span className="text-base font-semibold">💵 Cash on Delivery</span>
              <span className="text-sm">🚚 (For Order Above ₹500)</span>
            </div>
          </button>

          <button onClick={handleOnlinePayment} className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full">
            💳 Pay Online (5% OFF)
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
