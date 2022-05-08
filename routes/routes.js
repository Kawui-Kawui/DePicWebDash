const { Router } = require("express");
const passport = require("../server/passport");
const { auth } = require("../util/middleware/auth");
const router = Router();
const userdata = require("../util/models/users_db");

const dash = require("./dashboard/index");
const shop = require("./shop/index");
const order = require("./shop/paymets/index");

try {
  router.get("/", (req, res) => {
    res.render("home", {
      user: req.user,
      esta: true,
    });
  });

  router.get(
    "/login",
    passport.authenticate("discord", {
      failureRedirect: `/`,
    }),
    (req, res) => {
      res.redirect("/");
    }
  );
  router.use("/order", order);
  router.get(
    "/tienda/discord/login",
    passport.authenticate("discord"),
    (req, res) => {
      res.redirect("./web/compra/discordbot");
    }
  );
  router.get("/cmd", (req, res) => {
    res.render("./web/cmd", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/FAQ", (req, res) => {
    res.render("./web/FaQ", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/Reglas", (req, res) => {
    res.render("./web/Reglas", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/rgl1", (req, res) => {
    res.render("./web/reglas/rgl1", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/rgl2", (req, res) => {
    res.render("./web/reglas/rgl2", {
      user: req.user,
      esta: true,
    });
  });
  router.use("/tienda", shop);
  router.use("/dash", dash);

  router.get("/perfil/:id", async (req, res) => {
    let datauserfind = await userdata.findOne({ id: req.params.id });

    if (!datauserfind) {
      datosSend = "No hay datos";
      let xd = await new userdata({
        id: req.params.id,
        coins: 0,
        emojisALL: 0,
        premiun: false,
      });
      await xd.save();
      console.log("xdddd");
    }
    var datosSend;
    var premiun;
    var descrip;
    var coins;
    var emojis;
    if (userdata === null) {
      datosSend = "No hay datos";
      let savenew = new userdata({
        id: req.params.id,
      });
    }

    if (datauserfind.premiun) {
      premiun = "Deshabilitado";
    } else if (datauserfind.premiun === true) {
      premiun = "Habilitado";
    } else {
      premiun = "Deshabilitado";
    }
    if (datauserfind.perso.desc) {
      descrip = datauserfind.perso.desc;
    } else {
      descrip = "No hay descripcion";
    }
    if (datauserfind.coins) {
      coins = datauserfind.coins;
    } else {
      coins = 0;
    }
    if (datauserfind.emojisAll) {
      emojis = datauserfind.emojisAll;
    } else {
      emojis = 0;
    }

    res.render(`./web/perfil`, {
      user: req.user,
      esta: true,
      datosSend,
      emojis,
      coins,
      descrip,
      premiun,
    });
  });
} catch (error) {}
module.exports = router;
