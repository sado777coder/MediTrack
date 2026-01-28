const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

const validate = require("../middlewares/validate");
const requireAuth = require("../middlewares/requireAuth");

const {
  registerUserValidator,
  loginUserValidator,
} = require("../validators/userValidator");

// Auth
router.post("/register", validate(registerUserValidator), registerUser);
router.post("/login", validate(loginUserValidator), loginUser);

// Profile
router.get("/me", requireAuth, getProfile);

module.exports = router;