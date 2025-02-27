const express = require("express");
const userModel = require("../Models/Users");
const { jwtAuthMiddleware } = require("../Middlewares/jwtMiddleware");

const router = express.Router();

// GET user profile
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // exclude -password field from the returned document
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// UPDATE user details
router.put("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // exclude -password field from the returned document
    const updatedUser = await userModel
      .findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password");
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
});

// DELETE user
router.delete("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
});

module.exports = router;
