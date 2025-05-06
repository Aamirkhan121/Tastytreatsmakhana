import express from 'express';
import { createProduct, getProductById, getProducts } from '../controllers/productControllers.js';


const router = express.Router();
router.get('/', getProducts);
router.post('/',createProduct)
router.get('/:id', getProductById); // Assuming you want to get a product by ID as well

export default router;
