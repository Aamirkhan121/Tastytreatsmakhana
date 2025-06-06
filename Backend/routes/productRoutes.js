import express from 'express';
import { createProduct, getProductById, getProducts, updateProduct} from '../controllers/productControllers.js';


const router = express.Router();
router.get('/', getProducts);
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.get('/:id', getProductById); // Assuming you want to get a product by ID as well
// Example Express route
router.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully" });
});


export default router;
