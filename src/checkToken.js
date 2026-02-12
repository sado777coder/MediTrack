const mongoose = require("mongoose");
const UserModel = require("./models/User"); // adjust path

mongoose.connect("mongodb://127.0.0.1:27017/meditrack")
  .then(async () => {
    const user = await UserModel.findOne({ email: "user@example.com" });
    if (!user) {
      console.log("User not found");
    } else {
      console.log("Stored hashed token:", user.resetToken);
      console.log("Token expiry:", new Date(user.resetTokenExpiry));
    }
    mongoose.disconnect();
  })
  .catch(err => console.error("DB connection error:", err));