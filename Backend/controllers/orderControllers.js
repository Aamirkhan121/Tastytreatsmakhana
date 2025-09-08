// import Order from "../models/Order.js";

// export const placeOrder = async (req, res) => {
//   const { productId, address, quantity = 1 } = req.body;

//   try {
//     const order = new Order({
//       userId: req.user._id,
//       productId,
//       address,
//       quantity,
//       paymentMethod: "COD",
//     });

//     const savedOrder = await order.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to place order", error: err.message });
//   }
// };

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("userId", "name email").populate("productId", "name price");
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders", error: err.message });
//   }
// };
import Order from '../models/Order.js';

// @desc    Place a new order (COD or Online)
// @route   POST /api/orders/create
// @access  Private
export const placeOrder = async (req, res) => {
  try {
    const {
      productId,
      quantity,
      name,
      email,
      phone,
      address,
      paymentMethod,
      paymentInfo, // Only for online payment
    } = req.body;

    if (!productId || !name || !email || !phone || !address || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newOrder = new Order({
      userId: req.user._id,
      productId,
      quantity: quantity || 1,
      name,
      email,
      phone,
      address,
      paymentMethod,
      paymentInfo: paymentMethod === 'Online' ? paymentInfo : undefined,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('productId', 'name price');

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to get orders' });
  }
};


// src/context/CartContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const exist = prev.find((item) => item.id === product.id);
//       if (exist) {
//         return prev.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart((prev) => prev.filter((item) => item.id !== productId));
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



// import Order from "../models/Order.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { products, totalAmount, name, email, phone, address, paymentMethod, paymentInfo } = req.body;

//     if (!products || products.length === 0) {
//       return res.status(400).json({ message: "No products in order" });
//     }

//     const order = new Order({
//       userId: req.user.id,
//       products,
//       totalAmount,
//       name,
//       email,
//       phone,
//       address,
//       paymentMethod,
//       paymentInfo,
//     });

//     await order.save();
//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("userId", "name email").populate("products.productId", "name price");
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   } 
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     order.status = status;
//     await order.save();
//     res.status(200).json(order);
//   }
//   catch (error) {
//     res.status(500).json({ message: error.message });
//   }   
// };

// export const getOrderById = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const order = await
//       Order.findById(orderId)
//         .populate("userId", "name email")
//         .populate("products.productId", "name price image");  
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     } 
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };