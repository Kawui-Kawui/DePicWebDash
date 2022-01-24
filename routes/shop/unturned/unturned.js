const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  res.render("./web/compra/unturned/index", {
    user: req.user,
    esta: true,
  });
});

module.exports = router;
