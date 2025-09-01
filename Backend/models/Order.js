import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  price: { type: Number, required: true },
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
    enum: [
      "Pending",       // Order placed, awaiting confirmation
      "Confirmed",     // Order confirmed by seller
      "Processed",     // Order packed, preparing for shipping
      "Shipped",       // Order dispatched to courier
      "Out for Delivery", // Courier out for delivery
      "Delivered",     // Order delivered to customer
      "Cancelled"      // Order cancelled (by user or admin)
    ],
    default: "Pending"
  },

  shippingDetails: {
    courierName: { type: String, default: "" },        // Courier company name
    trackingNumber: { type: String, default: "" },     // Tracking number
    expectedDelivery: { type: Date, default: null },   // Expected delivery date
  },

  cancellationReason: { type: String, default: "" },
}, {
  timestamps: true
});

export default mongoose.model("Order", orderSchema);
