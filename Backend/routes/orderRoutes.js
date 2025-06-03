import express from 'express';
import { placeOrder,getMyOrders,getAllOrders,updateOrderStatus } from '../controllers/orderControllers.js';
import { protect } from '../middleware/authMiddleware.js';
// import { placeOrder, getAllOrders } from '../controllers/orderControllers.js';
// import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create',protect, placeOrder);
router.get('/my', protect, getMyOrders);
router.get('/admin', getAllOrders);
router.patch('/admin/update/:id', updateOrderStatus);
// router.get('/admin', protect, isAdmin, getAllOrders);

export default router;
