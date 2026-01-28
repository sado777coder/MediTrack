require("dotenv").config();
const bcrypt = require("bcrypt");
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

    const user = new UserModel({
      email,
      password: hash,
      name,
    });

    await user.save();

    return res.status(201).json({
      message: "User is registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN USER
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token from utility
    const token = generateToken(user);

    return res.status(200).json({
      message: "logged in",
      user: {
        _id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER PROFILE
const getProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).select(
      "-password -__v"
    );

    res.status(200).json({
      message: "User profile fetched",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE USER PROFILE
const updateProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    ).select("-password -__v");

    res.status(200).json({
      message: "User profile updated",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE USER ACCOUNT
const deleteAccount = async (req, res, next) => {
  try {
    await UserModel.findByIdAndDelete(req.user._id);

    res.status(200).json({
      message: "User account deleted",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  deleteAccount,
};