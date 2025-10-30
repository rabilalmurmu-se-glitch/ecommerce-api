import Joi from "joi";

// For adding an item to the cart
export const addItemToCartSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
  }),

  quantity: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
  }),
});

// For updating quantity of a cart item
export const updateCartItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
  }),

  quantity: Joi.number().integer().min(1).required().messages({
    "number.min": "Quantity must be at least 1",
  }),
});

// For removing an item from the cart
export const removeCartItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    "any.required": "Product ID is required",
  }),
});
