import UserModel from "../models/User.models.js";

export const updateUser = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Session user:", req.user.id);

    const sessionUser = req.user.id;
    const { userId, email, name, role } = req.body;

    const user = await UserModel.findById(sessionUser);
    if (!user) {
      return res.status(404).json({
        message: "Session user not found.",
        success: false,
      });
    }

    if (user.role !== "ADMAIN") {
      return res.status(403).json({
        message: "Forbidden: You do not have permission to update user roles.",
        success: false,
      });
    }

    const payload = {};
    if (email) payload.email = email;
    if (name) payload.name = name;
    if (role) payload.role = role;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User to update not found.",
        success: false,
      });
    }

    res.json({
      message: "User Updated",
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "An error occurred while updating the user.",
      success: false,
    });
  }
};
