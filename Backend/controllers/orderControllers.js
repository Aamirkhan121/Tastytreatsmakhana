import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  const { productId, address, quantity = 1 } = req.body;

  try {
    const order = new Order({
      userId: req.user._id,
      productId,
      address,
      quantity,
      paymentMethod: "COD",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").populate("productId", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
