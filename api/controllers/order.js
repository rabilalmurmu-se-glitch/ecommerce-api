import * as orderService from "../services/order.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    console.log(items)

    const order = await orderService.createOrder(userId, items);
    return successResponse(res, "Order created successfully", order, null, 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const payforOrder = async (req, res) => {
  try {
    const payment = await orderService.createPayment(req.body);
    return successResponse(res, "Payment successfull", payment);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return successResponse(res, "Orders fetched successfully", orders);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId)
    const orders = await orderService.getUserOrders(userId);
    return successResponse(res, "User orders fetched successfully", orders);
  } catch (error) {
    return successResponse(res, error.message);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    return successResponse(res, "Order fetched successfully", order);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(id, status);
    return successResponse(res, "Order status updated successfully", order);
  } catch (error) {
    return errorResponse(res, 400, false, error.message);
  }
};
