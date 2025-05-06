// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   const fetchCart = async () => {
//     try {
//       const { data } = await axios.get("/api/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCartItems(data.products);
//     } catch (error) {
//       console.error("Error loading cart:", error);
//       toast.error("Failed to load cart");
//     }
//   };

//   const handleRemove = async (productId) => {
//     try {
//       await axios.post(
//         "/api/cart/remove",
//         { productId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       toast.success("Item removed");
//       fetchCart();
//     } catch (error) {
//       toast.error("Failed to remove item");
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="bg-orange-50 min-h-screen py-10 px-4 md:px-12 text-gray-800">
//       <h2 className="text-4xl font-bold text-center text-orange-700 mb-10">
//         Your Shopping Cart
//       </h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center text-gray-600 text-lg">
//           Your cart is empty. Start adding your favorites!
//         </div>
//       ) : (
//         <div className="max-w-5xl mx-auto space-y-6">
//           {cartItems.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col sm:flex-row items-center sm:items-start bg-white shadow-lg rounded-2xl p-4 sm:p-6 gap-4 hover:shadow-xl transition"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full sm:w-32 h-32 object-cover rounded-xl"
//               />
//               <div className="flex-1 w-full">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                   <h3 className="text-xl font-semibold text-orange-700">{item.name}</h3>
//                   <span className="text-lg font-bold text-orange-600 mt-2 sm:mt-0">
//                     ₹{item.price * item.quantity}
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-sm mt-1">
//                   ₹{item.price} × {item.quantity}
//                 </p>
//                 <button
//                   onClick={() => handleRemove(item.productId)}
//                   className="mt-4 inline-block px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Total Section */}
//           <div className="bg-white p-6 rounded-2xl shadow-lg text-right">
//             <h4 className="text-2xl font-bold text-orange-700">
//               Total: ₹{calculateTotal()}
//             </h4>
//             <button
//   onClick={() => navigate("/checkout", { state: { totalAmount: calculateTotal() } })}
//   className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-sm font-semibold rounded-lg shadow transition"
// >
//   Proceed to Checkout
// </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;





