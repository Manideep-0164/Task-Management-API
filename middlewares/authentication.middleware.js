const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.JWT_TKN_SECRET;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    if (!token) return res.status(401).json({ message: "Token not found" });

    // verify JWT token
    jwt.verify(token, SECRET, (err, decoded) => {
      // check whether token expired
      if (err?.name === "TokenExpiredError")
        return res
          .status(440)
          .json({ message: "Session expired, Please login." });

      // check for token errors
      if (err?.name === "JsonWebTokenError") {
        console.error("JWT verification error:", err.message);
        return res
          .status(400)
          .json({ message: "Something went wrong, Please login again" });
      }

      // get the user info
      const { userId, email } = decoded;

      req.userId = userId;
      req.email = email;

      next();
    });
  } catch (error) {
    console.log(`Error authenticating user => ${error}`);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again later" });
  }
};

module.exports = {
  authenticate,
};
