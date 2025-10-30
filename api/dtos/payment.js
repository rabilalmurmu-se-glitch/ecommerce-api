import Joi from "joi";

export const createPaymentSchema = Joi.object({
  orderId: Joi.string().trim().required().messages({
    "any.required": "Order ID is required",
    "string.empty": "Order ID cannot be empty",
  }),

  transactionId: Joi.string().trim().required().messages({
    "any.required": "Transaction ID is required",
    "string.empty": "Transaction ID cannot be empty",
  }),

  amount: Joi.number().min(0).required().messages({
    "number.base": "Amount must be a number",
    "number.min": "Amount must be positive",
    "any.required": "Amount is required",
  }),

  status: Joi.string().valid("SUCCESS", "FAILED").required().messages({
    "any.only": "Status must be either SUCCESS or FAILED",
    "any.required": "Payment status is required",
  }),
});
