const express = require('express');
const { signin } = require("../ctrls/user/signin.js");
const { signup } = require("../ctrls/user/signup.js");
const { OTPVV } = require("../ctrls/user/otp.js");
const { forgotpass } = require("../ctrls/user/forgotpass.js");
const { forgotp } = require("../ctrls/user/forgotp.js");
const { createNote } = require("../ctrls/notes/createNote.js")
const { editNote } = require("../ctrls/notes/editNote.js")
const { deleteNote } = require("../ctrls/notes/deleteNote.js")
const { reqNote } = require("../ctrls/notes/reqNote.js")
const { userID } = require("../ctrls/notes/ids.js")
const { noteID } = require("../ctrls/notes/noteIds.js")

// ROUTER
const router = express.Router();

// USER ROUTES
router.post("/user/signin", signin);
router.post("/user/signup", signup);
router.post("/user/signup/verify", OTPVV);
router.post("/user/forgotpass", forgotpass);
router.post("/user/forgotpass/verify", forgotp);

// NOTE ROUTES
router.post("/note/create", createNote);
router.post("/note/delete", deleteNote);
router.post("/note/edit", editNote);
router.post("/note/req", reqNote);
router.post("/note/uID", userID);
router.post("/note/nId", noteID);

module.exports = router;