const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const ServerCtrl = require("../controllers/serverManager");
const Server = require("../models/serverManager");

//middleware to athenticateToken token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).send({ success: false, message: "Error!" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).send({ success: false, message: "Error!" });
    req.userID = user.usernameID;
    next();
  });
};

//middleware to find server by ID
const getServer = async (req, res, next) => {
  let server;

  try {
    server = await Server.findById(req.params.id);

    if (server === null) {
      return res
        .status(404)
        .json({ success: false, message: "cannot find subscriver" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: err.message });
  }

  res.server = server;
  next();
};

//create server
router.post("/createServer", authenticateToken, ServerCtrl.createServer);

//Get all servers
router.get("/getAllServer", authenticateToken, ServerCtrl.getAllServer);

router.delete(
  "/deleteServer/:id",
  authenticateToken,
  getServer,
  ServerCtrl.deleteServer
);

//update server
router.patch(
  "/updateServer",
  authenticateToken,
  getServer,
  ServerCtrl.updateServer
);
module.exports = router;
