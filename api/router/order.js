import { Router } from "express";
import * as orderController from "../controllers/order.js";
import {
  authMiddleware,
  adminMiddleware,
  useAccessControl,
} from "../middlewares/auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createOrderSchema, updateOrderStatusSchema } from "../dtos/order.js";

const router = Router();

// ✅ Create a new order (user must be logged in)
router.post(
  "/",
  authMiddleware,
  validateSchema(createOrderSchema),
  orderController.createOrder
);

// 💳 Pay for an order
router.post("/pay", authMiddleware, orderController.payforOrder);

// 📦 Get all orders (admin only)
router.get(
  "/",
  authMiddleware,
  useAccessControl(["admin"]),
  orderController.getAllOrders
);

// 👤 Get orders for a specific user (requires auth)
router.get("/my", authMiddleware, orderController.getUserOrders);

router.get("/:id", authMiddleware, orderController.getOrderById);

router.patch(
  "/:id/status",
  authMiddleware,
  useAccessControl(["admin"]),
  validateSchema(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

export default router;
