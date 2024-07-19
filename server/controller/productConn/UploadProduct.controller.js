import ProductModel from "../../models/Product.model.js";
export const UploadProductController = async (req, res) => {
  try {
    const uploadProduct = new ProductModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(201).json({
      message: "Product uploaded successfully",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
export const UpdateProductController = async (req, res) => {
  const { productId } = req.params;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      error: false,
      success: true,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
