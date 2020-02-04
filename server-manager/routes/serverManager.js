const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ServerCtrl = require("../controllers/serverManager");

//middleware to athenticateToken token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ success: false, message: "Error!" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.status(401).send({ success: false, message: "Error!" });
    req.userID = user.usernameID;
    console.log("userID", req.userID);
    next();
  });
};

//create server
router.post("/createServer", authenticateToken, ServerCtrl.createServer);

//Get all servers
router.get("/getAllServer", authenticateToken, ServerCtrl.getAllServer);

module.exports = router;
