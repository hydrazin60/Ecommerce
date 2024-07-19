import ProductModel from "../../models/Product.model.js";
import UserModel from "../../models/User.models.js";

export const UpdateProduct = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Session user:", req.user);

    const sessionUser = req.user.id;
    const { _id, ...productDetails } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
      });
    }

    const user = await UserModel.findById(sessionUser);
    if (!user) {
      return res.status(404).json({
        message: "Session user not found.",
        success: false,
      });
    }

    if (user.role !== "ADMAIN") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update products.",
        success: false,
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      _id,
      productDetails,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product to update not found.",
        success: false,
      });
    }

    res.json({
      message: "Product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
      success: false,
    });
  }
};

// import { uploadProductPermission } from "../../helper/permission.postProduct.js";
// import ProductModel from "../../models/Product.model.js";

// export const UpdateProduct = async (req, res) => {
//   try {
//     if (!uploadProductPermission(req.user)) {
//       throw new Error("Permission denied");
//     }
//     const { _id, ...resBody } = req.body;
//     const updateProduct = await ProductModel.findByIdAndUpdate(_id, resBody);
//     res.json({
//       message: "Product Update Successfully",
//       data: updateProduct,
//       sucess: true,
//       error: false,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "Internal server error",
//     });
//   }
// };
