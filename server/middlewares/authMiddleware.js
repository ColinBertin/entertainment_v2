const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
require("dotenv").config({ path: "./config.env" });

// Middleware to verify user authentication
exports.userVerification = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1] || "";

    if (!token || token === "null") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.id) {
      const user = await User.findOne({ _id: new ObjectId(decoded.id) });
      if (user) {
        req.user = user; // Attach user object to request for future use
        return next();
      }
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired" });
    } else {
      console.error(error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
