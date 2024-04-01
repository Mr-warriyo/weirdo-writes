const User = require("../../models/user.js")
const bcrypt = require("bcryptjs")

const signin = async (req, res) => {
  let { mail, pass } = req.body
  mail = mail.trim()
  password = pass.trim()

  if (mail.length <= 0 || password.length <= 0) {
    res.json({
      status: "FAILED",
      message: "Empty Input Fields.",
    })
  } else {
    const user = User.find({ email: mail }).then((result) => {

      console.log(result)
      if (!result.length) {
        res.json({
          status: "FAILED",
          message:
            "User with this EMAIL doesnt exist. Try Creating an Account!",
        })
      } else {
        const validUser = bcrypt.compareSync(password, result[0].password)
        if (!validUser) {
          res.json({
            status: "FAILED",
            message:
              "The Password you entered doesn't match with the real password. Try ForgotPass if you cant memorize it.",
          })
        } else if (!result[0].verified) {
          res.json({
            status: "FAILED",
            message: "Email not verified!"
          })
        } else {
          res.json({
            status: "SUCCESS",
            _id: result[0]._id,
            name: result[0].name,
            mail: result[0].email,
            message: "Trying to LogIn...",
          })
        }
      }
    })
  }
}

module.exports = { signin };