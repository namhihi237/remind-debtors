require("./passport");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const payBookRouter = require("../api/routes/payBook.route");
const authRouter = require("../api/routes/auth.router");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const middleware = require("../api/middleware/auth.middleware");
const app = express();
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", "./src/api/views");
app.use(express.static("src/api/public"));
app.set("view engine", "pug");
app.use(cookieParser(process.env.COOKIEKEY));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/auth", authRouter);
app.use("/paybook", middleware.loggedIn, payBookRouter);
app.use("/home", middleware.loggedIn, (req, res) => {
  res.send("logined");
});
module.exports = app;
