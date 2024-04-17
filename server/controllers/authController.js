const User = require("../models/userModel");
const { createSecretToken } = require("../utils/secretToken");
const emailRegex = require("../utils/helpers");
const bcrypt = require("bcryptjs");

// Handle register
exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please input a correct email format" });
    }

    if (username.length < 3 || username.length > 28) {
      return res
        .status(400)
        .json({ message: "Username must be between 3 and 28 character(s)" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password is too short!" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      email,
      username,
      password,
    });

    // Save the user to the database
    const createdUser = await newUser.save();

    if (createdUser) {
      // Generate a token for the user
      const token = createSecretToken(createdUser._id);

      // Return the user information and token
      res.cookie("token", token, {
        httpOnly: true, // Cookie can't be accessed by client-side scripts
        secure: true, // Cookie will only be sent over HTTPS
        sameSite: "None", // Restricts cookie to same-site requests
      });

      res.status(201).json({
        message: "User signed up successfully!",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Handle login.
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please input a correct email format" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password!" });
    }

    // Compare the provided password with the hashed password
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.status(400).json({ message: "Incorrect email or password!" });
    }

    // Generate a token for the user
    const token = createSecretToken(user._id);

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // Cookie can't be accessed by client-side scripts
      secure: true, // Cookie will only be sent over HTTPS
      sameSite: "None", // Restricts cookie to same-site requests
    });

    res.status(200).json({
      message: "User logged in successfully!",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Handle logout
exports.logout = async (req, res, next) => {
  try {
    delete req.user;
    res.clearCookie("token");

    res.status(200).json({
      message: "Logout successful!",
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
