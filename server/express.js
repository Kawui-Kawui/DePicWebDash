const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("./passport");
const BotClient = require("./bot");
const path = require("path");
const morgan = require("morgan");
const app = express();

app
  .set("port", process.env.PORT || 3000)
  .use(express.static("public"))
  .use(express.urlencoded({ extended: true }))
  .use(
    session({
      secret: "DashBoardDePic",
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .set("views", path.join(__dirname, "../views"))
  .set("view engine", ".hbs")
  .engine(".hbs", hbs({ extname: ".hbs" }))
  .use((req, res, next) => {
    req.BotClient = BotClient;
    next();
  })
  .use(morgan("dev"))
  .use("/", require("../routes/routes"))
  .use((req, res, next) => {
    res.status(404).render("404");
  });

module.exports = app;
