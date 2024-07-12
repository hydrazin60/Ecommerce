import UserModel from "../models/User.models.js";
import bcryptjs from "bcryptjs";

export const SignUpController = async (req, res) => {
  try {
    const { name, email, password ,  profile } = req.body;
 
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all fields",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashPassword = bcryptjs.hashSync(password, 4);
    const newUser = new UserModel({
      name,
      email,
      profile,
      role : "GENERAL",
      password: hashPassword,
    });
    await newUser.save();
    const userToReturn = newUser.toObject();
    delete userToReturn.password;
    console.log(userToReturn);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userToReturn,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
