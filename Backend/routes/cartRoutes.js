import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addToCart, clearCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartControllers.js";

const router = express.Router();
router.use(protect)

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.post("/update-qty", updateQuantity);
router.post("/clear", clearCart);


export default router;


