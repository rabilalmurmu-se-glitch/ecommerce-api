import { Product } from "../models/product.js";

export const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

export const getAllProducts = async (filters = {}, options = {}) => {
  const { page = 1, limit = 10, search } = options;

  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const products = await Product.find({ ...filters, ...query })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments({ ...filters, ...query });

  return { products, total, page, limit };
};


export const updateProductById = async (productId, updateData) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProduct) throw new Error("Product not found");
  return updatedProduct;
};

export const deleteProductById = async (productId) => {
  const deletedProduct = await Product.findByIdAndDelete(productId);
  if (!deletedProduct) throw new Error("Product not found");
  return deletedProduct;
};
