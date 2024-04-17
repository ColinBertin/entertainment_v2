const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

// Handle user update on PUT.
exports.user_update = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedUserData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error("Error updating a user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.user_details = async (req, res) => {
  try {
    const userId = req.user.id;
    const authToken = req.cookies.token;

    // Check if the token is provided
    if (!authToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }

    // Verify the token
    jwt.verify(
      authToken,
      process.env.JWT_SECRET_KEY,
      async (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid token" });
        }

        // Check if the decoded user ID matches the requested user ID
        if (decodedToken.id !== userId) {
          return res.status(403).json({
            message:
              "Forbidden: You do not have permission to access this resource",
          });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Return the user details
        return res.status(200).json({
          success: true,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
