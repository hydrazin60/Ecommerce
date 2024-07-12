import jwt from "jsonwebtoken";

async function authToken(req, res, next) {
  try {
    const token =
      req.cookies?.access_token || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (typeof token !== "string") {
      return res.status(400).json({
        success: false,
        message: "Token must be a string",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
}

export default authToken;


// import jwt from "jsonwebtoken";

// async function authToken(req, res, next) {
//   try {
//     const token =
//       req.cookies?.access_token || req.headers["authorization"]?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//         data: [],
//         error: true,
//       });
//     }
//     if (typeof token !== "string") {
//       return res.status(400).json({
//         success: false,
//         message: "Token must be a string",
//         data: [],
//         error: true,
//       });
//     }
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET,
//       function (err, decoded) {
//         console.log(err);
//         console.log(decoded);
//       }
//     );
//     req.user = decoded;
//     next();
//   } catch (err) {
//     if (err.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token",
//         data: [],
//         error: true,
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: err.message || "Internal server error",
//       data: [],
//       error: true,
//     });
//   }
// }

// export default authToken;
