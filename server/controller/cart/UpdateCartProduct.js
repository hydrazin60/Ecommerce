import AddToCartModel from "../../models/cartProduct.model.js";

export const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.user.id; // Ensure you get the user ID correctly
    const addToCartProductId = req.body._id; // Product ID to be updated
    const quantity = req.body.quantity; // New quantity to be set

    if (!addToCartProductId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
      });
    }

    // Perform the update operation
    const updateProduct = await AddToCartModel.updateOne(
      { _id: addToCartProductId, userId: currentUserId }, // Query to match the document
      { $set: { quantity: quantity } } // Update operation
    );

    // Check if the update was successful
    if (updateProduct.nModified === 0) {
      return res.status(404).json({
        message: "Product not found or no changes made",
        success: false,
      });
    }

    res.json({
      message: "Product updated successfully",
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
