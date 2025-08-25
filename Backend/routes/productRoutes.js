import express from 'express';
import { createProduct, getProductById, getProducts, updateProduct,deleteProduct, getProductBySlug } from '../controllers/productControllers.js';


const router = express.Router();
router.get('/', getProducts);
router.post('/',createProduct)
router.put('/:id',updateProduct)
router.get('/:id', getProductById); 
router.get('/:slug', getProductBySlug);
router.delete("/delete/:id",deleteProduct);


export default router;
