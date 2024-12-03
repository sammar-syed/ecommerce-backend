const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

// PUT route for updating a user
router.put("/:id", protect, updateUser);

// DELETE route for deleting a user
router.delete("/:id", protect, deleteUser);


module.exports = router;
