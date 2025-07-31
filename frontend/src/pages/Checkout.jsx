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
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const passedQuantity = location.state?.quantity || 1;
  const passedFormData = location.state?.formData || {
    name: "",
    email: "",
    phone: "",
    address: "",
  };

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState(passedFormData);
  const [quantity, setQuantity] = useState(passedQuantity);

  // Delivery charge logic
  const deliveryCharge = quantity >= 4 ? 0 : 50;
  const totalPrice = (product?.price || 0) * quantity + deliveryCharge;

  if (!product) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 mb-4">No product selected. Please go to Product Page.</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Go to Products
        </Link>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleQuantityChange = (type) => {
    let newQty = quantity;
    if (type === "inc") newQty += 1;
    else if (type === "dec" && quantity > 1) newQty -= 1;
    setQuantity(newQty);
  };

  const checkLogin = () => {
    if (!token) {
      toast.error("Please login to place your order");
      navigate("/login", {
        state: { from: "/checkout", product, quantity, formData },
      });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!checkLogin()) return;

    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) return toast.error("Please fill all fields");

    try {
      await axios.post(
        "https://api.tastycrunchmakhana.com/api/orders/create",
        {
          productId: product._id,
          quantity,
          totalAmount: totalPrice,
          name,
          email,
          phone,
          address,
          paymentMethod: "COD",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed with Cash on Delivery!");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  const handleOnlinePayment = async () => {
    if (!checkLogin()) return;

    const { name, email, phone, address } = formData;
    if (!name || !email || !phone || !address) return toast.error("Please fill all fields");

    const res = await loadRazorpayScript();
    if (!res) return toast.error("Razorpay SDK failed to load");

    try {
      const orderResponse = await axios.post(
        "https://api.tastycrunchmakhana.com/api/payment/order",
        {
          amount: totalPrice * 100,
          currency: "INR",
          receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const order = orderResponse.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_live_KoIZrsBfMnwNHj",
        amount: order.amount,
        currency: order.currency,
        name: "Tasty Crunch",
        description: "Product Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            await axios.post(
              "https://api.tastycrunchmakhana.com/api/orders/create",
              {
                productId: product._id,
                quantity,
                totalAmount: totalPrice,
                name,
                email,
                phone,
                address,
                paymentMethod: "Online",
                paymentInfo: {
                  id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  signature: response.razorpay_signature,
                },
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Payment successful and order placed!");
            navigate("/products");
          } catch (error) {
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

  const isCODDisabled = quantity < 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">🛒 Checkout</h1>

        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-32 h-32 rounded-xl object-cover shadow-md"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">₹{product.price} / item</p>
            <div className="flex items-center mt-3">
              <button onClick={() => handleQuantityChange("dec")} className="bg-gray-200 px-3 py-1 rounded-l text-lg">−</button>
              <span className="px-4 text-lg">{quantity}</span>
              <button onClick={() => handleQuantityChange("inc")} className="bg-gray-200 px-3 py-1 rounded-r text-lg">+</button>
            </div>
            <p className="mt-2 text-green-700 font-medium">
              Total: ₹{totalPrice} {deliveryCharge > 0 && `(₹${deliveryCharge} Delivery)`}
            </p>
            {quantity >= 4 && (
              <p className="text-sm text-blue-500 mt-1">🎉 Free Delivery on 4+ products!</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none" />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none" />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none" />
          <textarea name="address" placeholder="Shipping Address" value={formData.address} onChange={handleChange} rows="3" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
          <button disabled={isCODDisabled} className={`w-full md:w-auto px-6 py-3 rounded-full transition ${isCODDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white font-semibold"}`} onClick={handlePlaceOrder}>
            🚚 Cash on Delivery
          </button>
          <button className="w-full md:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition" onClick={handleOnlinePayment}>
            💳 Pay Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
