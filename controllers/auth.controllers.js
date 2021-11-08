const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user.model");

const SECRET = process.env.SECRET;

async function loginUser(req, res) {
  try {
    const { username, password } = req;
    const user = await User.find({ username });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ userId: user._id }, SECRET, {
        expiresIn: "24h",
      });
      res.status(200).json({ success: true, message: "Login successfull", token, user });
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Unauthorized",
        errorMessage: error.message,
      });
  }
}

async function signupUser(req, res) {
  try {
    const { user } = req.body;
    const newUser = await User.create(user);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();
    savedUser.password = undefined;
    const token = jwt.sign({ userId: savedUser._id }, SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ success: true, token, savedUser });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error signing up user",
        errorMessage: error.message,
      });
  }
}

async function checkUsernameValidity(req, res) {
  try {
    const { username } = req.body;
    const user = await User.find({ username });
    if (user.length > 0) {
      res
        .status(200)
        .json({ success: false, message: "username already exists" });
    } else {
      res.status(200).json({ success: true, message: "username available" });
    }
  } catch (error) {
    res.status(400).json({ success: false, errorMessage: error.message });
  }
}

async function checkEmailValidity(req, res) {
  try {
    const { email } = req.body;
    const user = await User.find({ email });
    if (user.length > 0) {
      res.status(200).json({ success: false, message: "email already exists" });
    } else {
      res.status(200).json({ success: true, message: "email available" });
    }
  } catch (error) {
    res.status(400).json({ success: false, errorMessage: error.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
  checkEmailValidity,
  checkUsernameValidity,
};
