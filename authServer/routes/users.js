const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

//middleware to find user by username
const getUser = async (req, res, next) => {
  let user;
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
};

//sign up user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//login user
router.post("/login", getUser, async (req, res) => {
  const password = req.body.password;
  try {
    if (await bcrypt.compare(password, res.user.password)) {
      const accessToken = generateAccessToken(res.user._id);
      res.cookie("accessToken", accessToken);
    } else {
      res.send("incorrect login");
    }
  } catch (error) {
    res.status(500).send();
  }
});

//logout
router.delete("/logout", (req, res) => {
  res.clearCookie("accessToken");
});

const generateAccessToken = userID => {
  return jwt.sign(userID, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m"
  });
};

module.exports = router;
