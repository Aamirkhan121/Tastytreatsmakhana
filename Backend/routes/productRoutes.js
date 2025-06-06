import express from 'express';
import { createProduct, getProductById, getProducts, updateProduct,deleteProduct } from '../controllers/productControllers.js';


const router = express.Router();
router.get('/', getProducts);
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.get('/:id', getProductById); // Assuming you want to get a product by ID as well
// Example Express route
router.delete("/delete/:id");


export default router;
