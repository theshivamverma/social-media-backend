const express = require("express");

const router = express.Router();

const {
  loginUser,
  signupUser,
  checkUsernameValidity,
  checkEmailValidity,
} = require("../controllers/auth.controllers");

router.route("/login").post(loginUser);

router.route("/signup").post(signupUser);

router.route("/username-check").post(checkUsernameValidity);

router.route("/email-check").post(checkEmailValidity);

module.exports = router;
