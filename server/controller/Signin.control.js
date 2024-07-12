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

    const passwordIsValid = await bcrypt.compare(
      password,
      existingUser.password
    );

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
      expiresIn: "2y",
    });

    // Exclude password from user object
    const { password: pass, ...rest } = existingUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure secure flag is set correctly
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // SameSite configuration
        expires: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000), // Cookie expiration
      })
      .json({
        success: true,
        message: "Sign in successful",
        user: rest,
      });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
      error: err,
    });
  }
};

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

//     const passwordIsValid = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!passwordIsValid) {
//       return res.status(400).json({
//         success: false,
//         message: "Incorrect password",
//       });
//     }

//     const tokenPayload = {
//       id: existingUser._id,
//     };
//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: "2y",
//     });

//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "None",
//         expires: new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
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
//       message: "An unexpected error occurred",
//       error: err,
//     });
//   }
// }
