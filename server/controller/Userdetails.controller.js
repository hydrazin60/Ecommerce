import UserModel from "../models/User.models.js";

export const UserDetailsController = async (req, res) => {
  try {
    const userId = req.user.id; // Correctly access the user ID
    const user = await UserModel.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User details retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// import UserModel from "../models/User.models.js";

// export const UserDetailsController = async (req, res) => {
//   try {
//     console.log("userId", req.userId);
//     const user = await UserModel.findById(req.userId);
//     res.status(200).json({
//       data: user,
//       error: false,
//       success: true,
//       message: "User details",
//     });

//     console.log("user", user);
//   } catch (err) {
//     res.status(400).json({
//       message: err.message || err,
//       error: true,
//       success: false,
//     });
//   }
// };
