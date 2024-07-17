import ProductModel from "../../models/Product.model.js";

export const getProductController = async (req, res) => {
  try {
    const allProduct = await ProductModel.find().sort({ createdAt: -1 });

    res.json({
      message: "All Products",
      success: true,
      data: allProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
