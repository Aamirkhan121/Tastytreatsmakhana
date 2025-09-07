import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      image: String,
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);


