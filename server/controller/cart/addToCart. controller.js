import AddToCartModel from "../../models/cartProduct.model.js";
export const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user;

    console.log("Product ID:", productId);
    console.log("User Info:", currentUser);

    // Validate request body
    if (!productId || !currentUser || !currentUser.id) {
      return res.status(400).json({
        message: "Product ID and User ID are required",
        success: false,
      });
    }

    const userId = currentUser.id;

    // Check if the product already exists in the cart
    const existingProduct = await AddToCartModel.findOne({
      productId,
      userId,
    });

    if (existingProduct) {
      return res.status(400).json({
        message: "Product already exists in the cart",
        success: false,
      });
    }

    // Add the new product to the cart
    const newAddToCart = new AddToCartModel({
      productId,
      quantity: 1,
      userId,
    });

    const savedProduct = await newAddToCart.save();

    res.status(201).json({
      message: "Product added to cart successfully",
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);

    res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
