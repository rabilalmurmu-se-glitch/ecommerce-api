import { Router } from "express";
import * as cartController from "../controllers/cart.js";
import { authMiddleware } from "../middlewares/auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  addItemToCartSchema,
  removeCartItemSchema,
  updateCartItemSchema,
} from "../dtos/cart.js";

const router = Router();

// ✅ Get user's cart
router.get("/", authMiddleware, cartController.getUserCart);

router.post(
  "/add",
  authMiddleware,
  validateSchema(addItemToCartSchema),
  cartController.addItemToCart
);

router.put(
  "/update",
  authMiddleware,
  validateSchema(updateCartItemSchema),
  cartController.updateCartItem
);

router.delete(
  "/remove",
  authMiddleware,
  validateSchema(removeCartItemSchema),
  cartController.removeItemFromCart
);

export default router;
