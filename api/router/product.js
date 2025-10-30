import { Router } from "express";
import * as productController from "../controllers/product.js";
import { authMiddleware, useAccessControl } from "../middlewares/auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createProductSchema, updateProductSchema } from "../dtos/product.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  useAccessControl(["admin"]),
  validateSchema(createProductSchema),
  productController.createProduct
);

// 📦 Get all products (with pagination + search)
router.get("/", productController.getAllProducts);

router.put(
  "/:id",
  authMiddleware,
  useAccessControl(["admin"]),
  validateSchema(updateProductSchema),
  productController.updateProductById
);

router.delete(
  "/:id",
  authMiddleware,
  useAccessControl(["admin"]),
  productController.deleteProductById
);

export default router;
