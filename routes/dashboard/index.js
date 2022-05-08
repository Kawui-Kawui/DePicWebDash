const { Router } = require("express");
const router = Router();
const id = require("./system/id");
const { auth } = require("../../util/middleware/auth");

const subsystem = require("../../controllers/dashboard.controllers");

router.get("/", auth, (req, res) => {
  let guilds = req.user.guilds.filter((p) => (p.permissions & 8) === 8);
  let servidores = [];
  for (const key in guilds) {
    if (req.BotClient.guilds.cache.get(guilds[key].id)) {
      servidores.push({
        esta: true,
        id: req.BotClient.guilds.cache.get(guilds[key].id).id,
        name: req.BotClient.guilds.cache.get(guilds[key].id).name,
        icon: req.BotClient.guilds.cache.get(guilds[key].id).icon,
      });
    } else {
      servidores.push({
        esta: false,
        id: guilds[key].id,
        name: guilds[key].name,
        icon: guilds[key].icon,
      });
    }
  }

  res.render("../views/dash/dash", {
    user: req.user,
    esta: true,
    servidores,
  });
});

router.use("/:id/warn", auth, subsystem.WARN);
router.use("/:id/button", auth, subsystem.WARNL);
router.use("/:id/warnC", auth, subsystem.WARNC);
router.use("/:id/tickets", auth, subsystem.TICKETS);
router.use("/:id/logs", auth, subsystem.LOGS);
router.use("/:id/prefix", auth, subsystem.PREFIX);
router.use("/:id/others", auth, subsystem.LOGSP);
router.use("/:id/confe", auth, subsystem.CONFE);
router.use("/:id/bienv", auth, subsystem.BIENV);
router.use("/:id/bienvp/:type", auth, subsystem.BIENVP);

router.use("/:id", auth, id.GET_ID);
module.exports = router;
