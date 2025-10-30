import { Router } from "express";

// 🧩 Import all route modules
import userRoutes from "./user.js";
import productRoutes from "./product.js";
import cartRoutes from "./cart.js";
import orderRoutes from "./order.js";

const router = Router();

/**
 * 🌐 Base route registration
 * Each module is namespaced under /api/v1
 */

router.use("/users", userRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

// ✅ Health check route
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is up and running 🚀",
  });
});

export default router;
