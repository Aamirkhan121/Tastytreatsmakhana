import express from 'express';
import { placeOrder,getMyOrders,getAllOrders } from '../controllers/orderControllers.js';
import { protect } from '../middleware/authMiddleware.js';
// import { placeOrder, getAllOrders } from '../controllers/orderControllers.js';
// import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create',protect, placeOrder);
router.get('/my', protect, getMyOrders);
router.get('/admin', getAllOrders);
// router.get('/admin', protect, isAdmin, getAllOrders);

export default router;
