const User = require("../../models/user.js")
const UserOTPVERIFY = require("../../models/otp.js")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

async function mail(to, html, subject, res) {
  try {
    const transporter = await nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true,
    })

    let info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to,
      subject,
      html,
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      status: "FAILED",
      message: error.message,
    })
    User.deleteMany({ email: to })
  }
}

const forgotpass = async (req, res) => {
  let { mail, pass} = req.body
  email = mail.trim()
  password = pass.trim()
  try {
    if (email.length <= 0 || password.length <= 0) {
      res.json({
        status: "FAILED",
        message: "Empty Input Fields.",
      })
    } else {
      const user = User.find({ email })
        .then((result) => {
          if (result.length < 0) {
            res.json({
              status: "FAILED",
              message: "User with this EMAIL doesnt exists!",
            })
          } else {
            bcrypt.genSalt(10, async function (error, salt) {
              if (error) {
                res.json({
                  status: "FAILED",
                  message: error.message,
                })
                console.log(error.message)
              } else {
                bcrypt.hash(password, salt, async function (error, hash) {
                  if (error) {
                    res.json({
                      status: "FAILED",
                      message: error.message,
                    })
                    console.log(error.message)
                  } else {
                    const result = await User.findOneAndUpdate(
                        {
                          email: mail,
                        },
                        {
                          password: hash,
                          verified: false,
                        },
                        {
                          new: true
                        }
                    ).then((result) => {
                      sendVeriEmail(result, res)
                      
                    }).catch((error) => {
                      res.json({
                        status: "FAILED",
                        message: error.message,
                      })
                      console.log(error.message)
                      User.deleteMany({ email })
                      UserOTPVERIFY.findOneAndDelete({ email: mail })
                    })
                  }
                })
              }
            })
          }
        })
        .catch((error) => {
          res.json({
            status: "FAILED",
            message: error.message,
          })
          console.log(error.message)
          User.deleteMany({ email })
        })
    }
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    })
    User.deleteMany({ email })
  }
}

async function sendVeriEmail(result, res) {
  try {
    const otp = `${Math.floor(100000 + Math.random() * 900000)}`
    var subject = "Weirdo Writes"
    var html = `<div style="text-align: center;"> <h1> Hello ${result.name}! </h1> <p> Here's Your OTP: <b>${otp}</b> </p> <h3> This OTP will expire in 30mins. </h3></div>`
    User.deleteMany({ email: result.email })
    const newOTPVerify = await new UserOTPVERIFY({
      otp,
      email: result.email,
      createdAt: Date.now(),
      expiresAt: Date.now() + 1800000, // 30mins
    })

    await newOTPVerify.save()
    await mail(result.email, html, subject, res)
    res.json({
      status: "PENDING",
      message: `Verification OTP sent to ${result.email}!`,
      data: {
        email: result.email,
      },
    })
  } catch (error) {
    console.log(error.message)
    res.json({
      status: "FAILED",
      message: error.message,
    })
    User.deleteMany({ email: result.email })
  }
}

module.exports = { forgotpass }