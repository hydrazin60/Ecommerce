 
import UserModel from "../models/User.models.js";

export const uploadProductPermission = async (userId) => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.error("User not found");
      return false;
    }
    return user.role === "ADMIN"; // Ensure the correct role is checked
  } catch (error) {
    console.error("Error checking user permissions:", error);
    return false;
  }
};

// import UserModel from "../models/User.models.js";

// export const uploadProductPermission = async (userId) => {
//   try {
//     const user = await UserModel.findById(userId);
//     return user.role === "ADMAIN";
//   } catch (error) {
//     console.error("Error checking user permissions:", error);
//     return false;
//   }
// };
 