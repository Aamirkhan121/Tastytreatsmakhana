import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  extraImages: { type: [String], required: true },
  rating: { type: Number, default: 0 }, // Average rating
  ratingCount: { type: Number, default: 0 }, // Number of ratings
} ,{timestamps: true});

const Product = mongoose.model('Product', productSchema);

export default Product;

