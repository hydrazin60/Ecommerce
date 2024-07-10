// import UserModel from "../models/User.models.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const SignIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide both email and password",
//       });
//     }

//     const existingUser = await UserModel.findOne({ email });

//     if (!existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist with this email",
//       });
//     }

//     const PasswordisValid = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!PasswordisValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     const Tokenpayload = {
//       id: existingUser._id,
//       email: existingUser.email,
//     };
//     const Token = jwt.sign(Tokenpayload, process.env.JWT_SECRET);

//     // const Token = jwt.sign(Tokenpayload, process.env.JWT_SECRET, {
//     //   expiresIn: "1h", // Token expires in 1 hour
//     // });

//     res
//       .status(200)
//       .cookie("access_token", Token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       })
//       .json({
//         success: true,
//         message: "Sign in successful",
//         user: {
//           id: existingUser._id,
//           email: existingUser.email,
//           name: existingUser.name,
//         },
//       });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message || "An unexpected error occurred",
//       error: err,
//     });
//   }
// };








import UserModel from "../models/User.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, existingUser.password);

    if (!passwordIsValid) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const tokenPayload = {
      id: existingUser._id,
      email: existingUser.email,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only set secure in production
        sameSite: "None", // Allows cross-site requests
        maxAge: 3600000, // 1 hour in milliseconds
      })
      .json({
        success: true,
        message: "Sign in successful",
        user: {
          id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "An unexpected error occurred",
      error: err,
    });
  }
};
