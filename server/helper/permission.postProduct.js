import UserModel from "../models/User.models.js";

export const uploadProductPermission = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    return user.role === "ADMAIN";
  } catch (error) {
    console.error("Error checking user permissions:", error);
    return false;
  }
};
