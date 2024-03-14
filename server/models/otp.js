const { Schema, model } = require("mongoose");

const UserOTPVerify = new Schema({
  userId: String,
  otp: String,
  email: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOTPVERIFY = model("UserOTPVerify", UserOTPVerify);

module.exports = UserOTPVERIFY;