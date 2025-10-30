import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).required().messages({
    "string.base": "Product name must be a string",
    "string.empty": "Product name cannot be empty",
    "string.min": "Product name must be at least 2 characters long",
    "any.required": "Product name is required",
  }),

  description: Joi.string().trim().min(5).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Product description cannot be empty",
    "string.min": "Description must be at least 5 characters long",
    "any.required": "Product description is required",
  }),

  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be negative",
    "any.required": "Product price is required",
  }),

  stock: Joi.number().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock quantity is required",
  }),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).optional(),
  description: Joi.string().trim().min(5).optional(),
  price: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).optional(),
});
