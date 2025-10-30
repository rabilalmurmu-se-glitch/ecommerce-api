import * as userService from "../services/user.js";
import { generateToken } from "../utils/jwtUtils.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";

export const registerUser = async (req, res) => {
  try {
    req.body.role = "user";
    const user = await userService.createUser(req.body);
    return successResponse(
      res,
      "User registered successfully",
      user,
      null,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.validateUserLogin(email, password);
    // Generate JWT token after successful login
    const token = generateToken(user);
    return successResponse(res, "Login successful", { token, user });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const createAdminUser = async (req, res) => {
  try {
    req.body.role = "admin";
    const adminUser = await userService.createUser(req.body);
    return successResponse(
      res,
      "Admin user created successfully",
      adminUser,
      null,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
