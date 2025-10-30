import { Router } from "express";
import * as userController from "../controllers/user.js";
import { authMiddleware, useAccessControl } from "../middlewares/auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { adminUserSchema, loginUserSchema, registerUserSchema } from "../dtos/user.js";

const router = Router();
router.post(
  "/register",
  validateSchema(registerUserSchema),
  userController.registerUser
);

router.post(
  "/login",
  validateSchema(loginUserSchema),
  userController.loginUser
);

router.post(
  "/create-admin",
  authMiddleware,
  useAccessControl(["admin"]),
  validateSchema(adminUserSchema),
  userController.createAdminUser
);

export default router;
