const express = require("express");
const bcrypt = require("bcryptjs");
const userModel = require("../Models/Users");
const { generateToken, jwtAuthMiddleware } = require("../Middlewares/jwtMiddleware");
const router = express.Router();

// Login for an existing user.
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token
    const userData = { _id: user._id };
    const token = generateToken(userData);

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        _id: user._id,
        startName: user.startName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { startName, lastName, mobileNumber, email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({
      $or: [{ mobileNumber }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this mobile number or email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new userModel({
      startName,
      lastName,
      mobileNumber,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const response = await newUser.save();

    // Create a new object with only the _id
    const userData = { _id: response._id };

    const token = generateToken(userData);

    return res.status(201).json({
      response: response,
      token: token,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
});

// Reset password for an existing user
router.post("/reset-password", jwtAuthMiddleware, async (req, res) => {
  try {
    const { newPassword } = req.body;

    // Check if newPassword is provided
    if (!newPassword) {
      return res.status(400).json({ message: "New password is required" });
    }

    // Get user from the token
    const userId = req.user._id;

    // Check if the user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

module.exports = router;
