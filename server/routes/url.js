const express = require('express');
const { signin } = require("../ctrls/user/signin.js");
const { signup } = require("../ctrls/user/signup.js");
const { OTPVV } = require("../ctrls/user/otp.js");
const { forgotpass } = require("../ctrls/user/forgotpass.js");
const { forgotp } = require("../ctrls/user/forgotp.js");

// ROUTER
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signup/verify", OTPVV);
router.post("/forgotpass", forgotpass);
router.post("/forgotpass/verify", forgotp);

module.exports = router;