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
