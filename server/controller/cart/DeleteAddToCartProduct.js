import AddToCartModel from "../../models/cartProduct.model.js";

export const deleteAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.user.id; // Ensure you are extracting the user ID correctly
    const addToCartProductId = req.body._id;

    if (!addToCartProductId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
      });
    }

    const deleteProduct = await AddToCartModel.deleteOne({
      _id: addToCartProductId,
      userId: currentUserId, // Ensure that userId is a string and matches the schema
    });

    if (deleteProduct.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found or not authorized to delete",
        success: false,
      });
    }

    res.json({
      message: "Product deleted successfully from cart",
      success: true,
      data: deleteProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
