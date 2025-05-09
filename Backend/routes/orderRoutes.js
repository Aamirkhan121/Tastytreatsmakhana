import express from 'express';
import { placeOrder, getAllOrders } from '../controllers/orderControllers.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, placeOrder);
router.get('/admin', protect, isAdmin, getAllOrders);

export default router;
