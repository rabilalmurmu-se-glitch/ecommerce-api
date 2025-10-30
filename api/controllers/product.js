import * as productService from "../services/product.js";
import { errorResponse, successResponse } from "../utils/responseUtil.js";

export const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    return successResponse(
      res,
      "Product created successfully",
      product,
      null,
      201
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const filter = req.body || {};
    const { page, limit, search } = req.query;
    const result = await productService.getAllProducts(
      { ...filter },
      { page, limit, search }
    );
    return successResponse(
      res,
      "Products fetched successfully",
      result.products,
      {
        total: result.total,
        page: result.page,
        limit: result.limit,
      }
    );
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProductById(
      req.params.id,
      req.body
    );
    return successResponse(res, "Product updated successfully", updatedProduct);
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProductById(
      req.params.id
    );
    return successResponse(res, "Product deleted successfully", deletedProduct);
  } catch (error) {
    return errorResponse(res, error.message, 404);
  }
};
