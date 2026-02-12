const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
} = require("../controllers/userController");

const validate = require("../middlewares/validate");
const requireAuth = require("../middlewares/requireAuth");

const {
  registerUserValidator,
  loginUserValidator,
} = require("../validators/userValidator");

// Register
router.post("/register", validate(registerUserValidator), registerUser);

// Login
router.post("/login", validate(loginUserValidator), loginUser);

// Forgot password → generates reset token
router.post("/forgot-password", forgotPassword);

// Reset password → user sends token + new password
router.post("/reset-password", resetPassword);

// Get logged-in user profile
router.get("/me", requireAuth, getProfile);

module.exports = router;