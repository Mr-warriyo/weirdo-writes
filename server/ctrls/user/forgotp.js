const User = require("../../models/user.js")
const UserOTPVERIFY = require("../../models/otp.js")
const bcrypt = require("bcryptjs")

const forgotp = async (req, res) => {
  try {
    let { mail, otp } = req.body
    if (mail.length <= 0 || otp.length <= 0) {
      res.json({
        status: "FAILED",
        message: "Fields are empty! g",
      })
    } else {
      const UserOTPVrecords = await UserOTPVERIFY.find({
        email: mail,
      })
      if (UserOTPVrecords.length <= 0) {
        res.json({
          status: "FAILED",
          message: "No User with thiis email could be found",
        })
      } else {
        const { expiresAt } = UserOTPVrecords[0]
        const dbOtp = UserOTPVrecords[0].otp
        if (expiresAt < Date.now()) {
          res.json({
            status: "FAILED",
            message: "OTP has been expired!",
          })
          await UserOTPVERIFY.findOneAndDelete({ mail })
        } else {
          if (!dbOtp || dbOtp !== otp) {
            res.json({
              status: "FAILED",
              message: "WRONG OTP ENTERED!!",
            })
          } else {
            await User.findOneAndUpdate(
              {
                email: mail,
              },
              {
                verified: true,
              }
            )
            await UserOTPVERIFY.findOneAndDelete({ email: mail })
            res.json({
              status: "SUCCESS!",
              message: "Password Changed Successfully! You can now Login.",
            })
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    })
    console.log(error.message)
  }
}

module.exports = { forgotp }