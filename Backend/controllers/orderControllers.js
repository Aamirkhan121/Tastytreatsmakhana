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


import crypto from 'crypto';
import Order from "../models/Order.js";

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
      paymentInfo,
    } = req.body;

    if (!productId || !name || !email || !phone || !address || !paymentMethod) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (paymentMethod === 'Online') {
      if (!paymentInfo || !paymentInfo.id || !paymentInfo.order_id || !paymentInfo.signature) {
        return res.status(400).json({ message: 'Payment info is required for online payments' });
      }

      const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
        .update(paymentInfo.order_id + "|" + paymentInfo.id)
        .digest('hex');

      if (generatedSignature !== paymentInfo.signature) {
        return res.status(400).json({ message: 'Invalid payment signature' });
      }
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
  res.status(500).json({ message: 'Failed to place order', error: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate("productId", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    .populate('productId', 'name image')
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Either read from body or default to “Delivered”
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
  const { cancellationReason } = req.body;  // use the exact field name

  if (!cancellationReason || cancellationReason.trim() === '') {
    return res.status(400).json({ message: 'Cancellation reason is required' });
  }

  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

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
    order.cancellationReason = cancellationReason;  // use the exact field name

    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
