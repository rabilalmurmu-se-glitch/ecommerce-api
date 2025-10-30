import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      trim: true,
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be positive"],
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: [true, "Payment status is required"],
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
