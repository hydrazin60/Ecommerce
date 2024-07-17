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
