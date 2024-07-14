 
import UserModel from "../models/User.models.js";

export const AlluserList = async (req, res) => {
  try {
    console.log("User ID from request:", req.user.id); // Access the ID from req.user

    const allUsers = await UserModel.find();
    res.json({
      message: "All Users",
      data: allUsers,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

