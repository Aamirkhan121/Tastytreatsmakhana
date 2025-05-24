import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1 },

  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    required: true
  },

  paymentInfo: {
    id: { type: String }, // Razorpay Payment ID
    order_id: { type: String }, // Razorpay Order ID
    signature: { type: String }, // Razorpay Signature
  },

  status: {
    type: String,
    enum: ["Pending", "Delivered"],
    default: "Pending"
  }
}, {
  timestamps: true
});

export default mongoose.model("Order", orderSchema);
