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
// import Order from '../models/Order.js';

// // @desc    Place a new order (COD or Online)
// // @route   POST /api/orders/create
// // @access  Private
// export const placeOrder = async (req, res) => {
//   try {
//     const {
//       productId,
//       quantity,
//       name,
//       email,
//       phone,
//       address,
//       paymentMethod,
//       paymentInfo, // Only for online payment
//     } = req.body;

//     if (!productId || !name || !email || !phone || !address || !paymentMethod) {
//       return res.status(400).json({ message: 'Please provide all required fields' });
//     }

//     const newOrder = new Order({
//       userId: req.user._id,
//       productId,
//       quantity: quantity || 1,
//       name,
//       email,
//       phone,
//       address,
//       paymentMethod,
//       paymentInfo: paymentMethod === 'Online' ? paymentInfo : undefined,
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
//   } catch (error) {
//     console.error('Error placing order:', error);
//     res.status(500).json({ message: 'Failed to place order' });
//   }
// };

// // @desc    Get all orders (Admin only)
// // @route   GET /api/orders/admin
// // @access  Private/Admin
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate('userId', 'name email')
//       .populate('productId', 'name price');

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Failed to get orders' });
//   }
// };


// 


import crypto from 'crypto';
import Order from "../models/Order.js";
import Product from '../models/Product.js';
import Cart from "../models/Cart.js";

const formatOrderId = (num) => num.toString().padStart(6, "0");

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      // Single product flow (from Product page)
      productId,
      quantity,

      // Cart flow (from Cart page)
      items, // [{ productId, quantity }]

      name, email, phone, address,
      paymentMethod,   // "COD" or "Online"
      paymentInfo,     // only for Online
    } = req.body;

    if (!name || !email || !phone || !address || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Verify payment signature for Online
    if (paymentMethod === 'Online') {
      if (!paymentInfo?.id || !paymentInfo?.order_id || !paymentInfo?.signature) {
        return res.status(400).json({ message: 'Payment info is required for online payments' });
      }
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(paymentInfo.order_id + "|" + paymentInfo.id)
        .digest('hex');
      if (generatedSignature !== paymentInfo.signature) {
        return res.status(400).json({ message: 'Invalid payment signature' });
      }
    }

    // Build a normalized list of lines to order
    let lines = [];
    if (Array.isArray(items) && items.length > 0) {
      lines = items.map(i => ({ productId: i.productId, quantity: Number(i.quantity || 1) }));
    } else if (productId) {
      lines = [{ productId, quantity: Number(quantity || 1) }];
    } else {
      return res.status(400).json({ message: 'No products to order' });
    }

    // Price calculation
    let total = 0;
    const productDocs = {};
    for (const line of lines) {
      const prod = await Product.findById(line.productId);
      if (!prod) return res.status(404).json({ message: 'Product not found' });
      productDocs[line.productId] = prod;
      total += prod.price * line.quantity;
    }

    // Delivery charge rule (mirror your UI): charge ₹40 if single-product QTY < 4, else 0.
    // For cart checkout, you can choose to waive if total>=500, else 40.
    let deliveryCharge = 0;
    if (lines.length === 1) {
      deliveryCharge = lines[0].quantity >= 4 ? 0 : 40;
    } else {
      deliveryCharge = total >= 500 ? 0 : 40;
    }
    let grandTotal = total + deliveryCharge;

    // 5% discount on Online
    if (paymentMethod === 'Online') {
      grandTotal = Math.round(grandTotal * 0.95);
    }

    // Generate sequential orderIds for each line
    const last = await Order.findOne().sort({ createdAt: -1 });
    let lastNum = last && last.orderId ? parseInt(last.orderId) : 0;
    if (Number.isNaN(lastNum)) lastNum = 0;

    // Create one Order per line (keeps your schema)
    const toCreate = [];
    for (const line of lines) {
      lastNum += 1;
      const thisLinePrice = productDocs[line.productId].price * line.quantity;
      // proportionally allocate delivery/discount across lines
      const share = (thisLinePrice / total) || 0;
      const allocated = Math.round(grandTotal * share);

      toCreate.push({
        orderId: formatOrderId(lastNum),
        userId,
        productId: line.productId,
        quantity: line.quantity,
        price: allocated, // store allocated final price per line
        name, email, phone, address,
        paymentMethod,
        paymentInfo: paymentMethod === 'Online' ? paymentInfo : undefined,
      });
    }

    const created = await Order.insertMany(toCreate);

    // If it was a cart checkout, clear the cart
    if (Array.isArray(items) && items.length > 0) {
      const cart = await Cart.findOne({ userId });
      if (cart) {
        // remove only items that were ordered
        const idsSet = new Set(lines.map(l => l.productId));
        cart.products = cart.products.filter(p => !idsSet.has(p.productId));
        await cart.save();
      }
    }

    return res.status(201).json({
      message: 'Order placed successfully',
      orders: created,
      grandTotal
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate("productId", "name price image");
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('productId', 'name image price');
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const newStatus = req.body.status || 'Delivered';
    order.status = newStatus;
    await order.save();
    return res.json({ message: `Order status updated to ${newStatus}`, order });
  } catch (error) {
    console.error('Failed to update order status:', error);
    return res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  const orderId = req.params.id;
  const { cancellationReason } = req.body;
  if (!cancellationReason?.trim()) {
    return res.status(400).json({ message: 'Cancellation reason is required' });
  }
  if (!req.user) return res.status(401).json({ message: 'User not authenticated' });

  try {
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this order' });
    }
    if (order.status === 'Delivered') {
      return res.status(400).json({ message: 'Delivered orders cannot be cancelled' });
    }
    if (order.status === 'Cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.status = 'Cancelled';
    order.cancellationReason = cancellationReason;
    await order.save();
    return res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
