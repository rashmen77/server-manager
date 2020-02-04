require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("morgan");
const server = require("./routes/serverManager");
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

//Secure approach
const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins
  })
);

//middlewares
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/", server);

app.listen(process.env.PORT, () =>
  console.log(`Ready on port ${process.env.PORT}`)
);
