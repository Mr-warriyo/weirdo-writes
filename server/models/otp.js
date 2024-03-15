const { Schema, model } = require("mongoose");

const UserOTPVerify = new Schema({
  otp: String,
  email: String,
  createdAt: Date,
  expiresAt: Date,
});

const UserOTPVERIFY = model("UserOTPVerify", UserOTPVerify);

module.exports = UserOTPVERIFY;