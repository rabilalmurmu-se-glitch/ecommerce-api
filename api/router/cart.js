import { Router } from "express";
import * as cartController from "../controllers/cart.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = Router();

// ✅ Get user's cart
router.get("/", authMiddleware, cartController.getUserCart);

router.post("/add", authMiddleware, cartController.addItemToCart);

router.put("/update", authMiddleware, cartController.updateCartItem);

router.delete("/remove", authMiddleware, cartController.removeItemFromCart);

export default router;
