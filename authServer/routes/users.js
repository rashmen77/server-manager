const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "6000s"
  });
}

//middleware to find user by username
const getUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return res.status(422).send({ success: false, message: "Error!" });
      }
      if (!user) {
        return res
          .status(422)
          .send({ success: false, message: "User does not exist" });
      }
      res.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(422)
      .send({ success: false, message: "Wrong Username or Password" });
  }
};

//login user
router.post("/login", getUser, async (req, res) => {
  const { password } = req.body;
  try {
    if (await bcrypt.compare(password, res.user.password)) {
      let user = { usernameID: res.user._id };
      const accessToken = generateAccessToken(user);
      res.json({ success: true, user: user, jwt: accessToken });
    } else {
      res.json({ success: false, message: "Wrong password" });
    }
  } catch (error) {
    res.status(500).send();
  }
});

//sign up user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    });
    const newUser = await user.save();
    res.send(JSON.stringify({ success: true, data: newUser.username }));
  } catch (err) {
    res.send(JSON.stringify({ message: err.message }));
  }
});

module.exports = router;
