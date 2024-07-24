import AddToCartModel from "../../models/cartProduct.model.js";

export const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser || !currentUser.id) {
      return res.status(401).json({
        message: "Unauthorized access",
        success: false,
      });
    }
    const allProducts = await AddToCartModel.find({
      userId: currentUser.id,
    }).populate("productId");
    res.status(200).json({
      data: allProducts,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
 