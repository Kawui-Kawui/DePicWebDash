const { Router } = require("express");
const router = Router();
const passport = require("../../server/passport");
const discord = require("./discord/DS");
const unturned = require("./unturned/unturned");

router.get("/", (req, res) => {
  res.render("./web/tienda", {
    user: req.user,
    esta: true,
  });
});

router.get("/terms", (req, res) => {
  res.render("./web/compra/terms", {
    user: req.user,
    esta: true,
  });
});

router.use("/discord", discord);
router.use("/unturned", unturned);

module.exports = router;
