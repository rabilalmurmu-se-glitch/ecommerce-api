import * as cartService from "../services/cart.js";
import { successResponse, errorResponse } from "../utils/responseUtil.js";


export const getUserCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId; // from auth or param
    const cart = await cartService.getUserCart(userId);
    return successResponse(res, "Cart fetched successfully", cart);
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};


export const addItemToCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { productId, quantity } = req.body;

    const updatedCart = await cartService.addItemToCart(userId, productId, quantity);
    return successResponse(res, "Item added to cart successfully", updatedCart);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { productId, quantity } = req.body;

    const updatedCart = await cartService.updateCartItem(userId, productId, quantity);
    return successResponse(res, "Cart item updated successfully", updatedCart);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};


export const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.body.userId;
    const { productId } = req.body;

    const updatedCart = await cartService.removeItemFromCart(userId, productId);
    return successResponse(res, "Item removed from cart successfully", updatedCart);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

