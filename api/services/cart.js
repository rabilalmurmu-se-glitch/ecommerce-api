import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const getUserCart = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate(
    "items.productId",
    "name price description"
  );
  if (!cart) throw new Error("Cart not found for this user");
  return cart;
};

export const addItemToCart = async (userId, productId, quantity = 1) => {
  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // create a new cart if not exists
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  return await cart.populate("items.productId", "name description price");
};

export const updateCartItem = async (userId, productId, quantity) => {
  if (quantity < 1) throw new Error("Quantity must be at least 1");

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(
    (i) => i.productId.toString() === productId.toString()
  );

  if (!item) throw new Error("Product not found in cart");

  item.quantity = quantity;
  await cart.save();

  return await cart.populate("items.productId", "name description price");
};

export const removeItemFromCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId.toString()
  );

  await cart.save();
  return await cart.populate("items.productId", "name description price");
};
