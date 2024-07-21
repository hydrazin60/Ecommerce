// import ProductModel from "../../models/Product.model.js";

// export const getProductDetails = async (req, res) => {
//   try {
//     const { ProductId } = req.body;
//     const product = await ProductModel.findById(ProductId);
//     res.json({
//       data: product,
//       sucess: true,
//       message: "ok",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: err?.message || "Internal server error",
//       success: false,
//     });
//   }
// };

import ProductModel from "../../models/Product.model.js";

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.body; // Ensure correct casing
    const product = await ProductModel.findById(productId);
    res.json({
      data: product,
      success: true,
      message: "ok",
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message || "Internal server error",
      success: false,
    });
  }
};
