import { Order } from "../models/order.js";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";
import mongoose from "mongoose";
import { Payment } from "../models/payment.js";

/**
 * 🧾 Create a new order from cart or given items
 */
export const createOrder = async (userId, items) => {
  if (!items || items.length === 0) {
    throw new Error("No items provided for the order");
  }

  let totalAmount = 0;
  const session = await mongoose.startSession();
  session.startTransaction();

  // Calculate total & validate products
  for (const item of items) {
    const product = await Product.findById(item.productId).session(session);
    if (!product) throw new Error(`Product not found: ${item.productId}`);
    if (product.stock < item.quantity)
      throw new Error(`Insufficient stock for ${product.name}`);
    // console.log(product)
    totalAmount += product.price * item.quantity;
    // Deduct stock
    product.stock -= item.quantity;
    await product.save({ session });
  }

  console.log(userId);
  console.log(totalAmount);
  // Create order
  const order = await Order.create(
    [
      {
        userId,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: item.priceAtPurchase || item.price || 0,
        })),
        totalAmount,
        status: "PENDING",
      },
    ],
    { session }
  );

  // Optional: Clear user’s cart after successful order
  await Cart.findOneAndUpdate({ userId }, { items: [] }, { session });

  await session.commitTransaction();
  await session.endSession();

  return order;
};

export const createPayment = async (paymentData) => {
  const { orderId, transactionId, amount, status } = paymentData;

  if (!orderId || !transactionId || !amount || !status) {
    throw new Error("All fields are required to create a payment");
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  // Validate order exists
  const order = await Order.findById(orderId).session(session);
  if (!order) throw new Error("Order not found for the given orderId");

  // Use order's totalAmount as the payment amount (trusted value)
  const paymentAmount = order.totalAmount;

  // Create payment entry
  const [payment] = await Payment.create(
    [
      {
        orderId,
        transactionId,
        amount: paymentAmount,
        status,
      },
    ],
    { session }
  );

  // Update order status based on payment result
  order.status = status === "SUCCESS" ? "PAID" : "FAILED";
  await order.save({ session });

  // Commit transaction
  await session.commitTransaction();
  session.endSession();

  return payment;
};

export const getAllOrders = async () => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("items.productId", "name description price")
    .sort({ createdAt: -1 });
  return orders;
};

export const getUserOrders = async (userId) => {
  const orders = await Order.find({ userId })
    .populate("items.productId", "name description price")
    .sort({ createdAt: -1 });
  return orders;
};

export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("userId", "name email")
    .populate("items.productId", "name description price");

  if (!order) throw new Error("Order not found");
  return order;
};

export const updateOrderStatus = async (orderId, status) => {
  const allowedStatus = [
    "PENDING",
    "PAID",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];
  if (!allowedStatus.includes(status)) {
    throw new Error("Invalid order status");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) throw new Error("Order not found");
  return order;
};
