const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("./web/compra/discordbot", {
    user: req.user,
    esta: true,
  });
  router.get("/bot/s", (req, res) => {
    res.render("./web/compra/discord/s", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/bot/a", (req, res) => {
    res.render("./web/compra/discord/a", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/bot/m", (req, res) => {
    res.render("./web/compra/discord/m", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/bot/c", (req, res) => {
    res.render("./web/compra/discord/c", {
      user: req.user,
      esta: true,
    });
  });
});
module.exports = router;
