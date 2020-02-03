require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const users = require("./routes/users");
const cookieParser = require("cookie-parser");
var cors = require("cors");
var bodyParser = require("body-parser");

//DB connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", users);

app.listen(process.env.PORT, () =>
  console.log(`Ready on port ${process.env.PORT}`)
);
