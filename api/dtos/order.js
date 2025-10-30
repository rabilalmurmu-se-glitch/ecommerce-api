import Joi from "joi";

// Schema for individual order items
const orderItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
  priceAtPurchase: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Price at purchase is required",
  }),
});

// Schema for creating an order
export const createOrderSchema = Joi.object({
  items: Joi.array().items(orderItemSchema).min(1).required().messages({
    "array.min": "At least one item is required in the order",
    "any.required": "Order items are required",
  }),
});

export const createOrderWithPaymentSchema = Joi.object({
  orderId: Joi.string().required().messages({
    "any.required": "Order ID is required",
  }),
  transactionId: Joi.string().required().messages({
    "any.required": "Transaction ID is required",
  }),
  amount: Joi.number().min(0).required().messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount must be positive",
    "any.required": "Amount is required",
  }),
  status: Joi.string().valid("SUCCESS", "FAILED").required().messages({
    "any.only": "Status must be either SUCCESS or FAILED",
  }),
});

// Schema for updating order status
export const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED")
    .required()
    .messages({
      "any.required": "Status is required",
      "any.only":
        "Status must be one of PENDING, PAID, SHIPPED, DELIVERED, or CANCELLED",
    }),
});
