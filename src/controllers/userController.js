require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../models/User");
const { hashPassowrd, generateToken } = require("../utility/bcrypt");

// REGISTER USER

const registerUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await hashPassowrd(password);

    const user = new UserModel({ email, password: hash, name });
    await user.save();

    return res.status(201).json({ message: "User is registered successfully" });
  } catch (err) {
    next(err);
  }
};

// LOGIN USER

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.status(200).json({
      message: "Logged in successfully",
      user: { _id: user.id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    next(err);
  }
};

// FORGOT PASSWORD

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token to store in DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save token and expiry in DB (15 minutes)
    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 15;
    await user.save();

    // Return raw token (in production, send via email)
    res.json({ message: "Password reset token generated", token: resetToken });
  } catch (err) {
    next(err);
  }
};

// RESET PASSWORD

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) 
      return res.status(400).json({ message: "Token and new password required" });

    // Hash the token from request
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with matching hashed token and valid expiry
    const user = await UserModel.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) 
      return res.status(400).json({ message: "Invalid or expired token" });

    // Hash new password and update
    user.password = await hashPassowrd(newPassword);

    // Clear token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    next(err);
  }
};

// GET PROFILE

const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password -__v");
    res.status(200).json({ message: "User profile fetched", data: user });
  } catch (err) {
    next(err);
  }
};

// UPDATE PROFILE

const updateProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password -__v");

    res.status(200).json({ message: "User profile updated", data: user });
  } catch (err) {
    next(err);
  }
};

// DELETE ACCOUNT

const deleteAccount = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: "User account deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
  deleteAccount,
};