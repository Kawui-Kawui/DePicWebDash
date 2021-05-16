const { Router } = require("express");
const passport = require("../server/passport");
const { auth } = require("../util/middleware/auth");
const router = Router();
const Prefix = require("../util/models/prefix_db");
const logsConfecion_db = require("../util/models/logsConfecion_db");
const setSugerencia_db = require("../util/models/setSugerencia_db");
const warn2_db = require("../util/models/warn2_db");
const bienvenidas_db = require("../util/models/bienvenidas_db");
const setConfention_db = require("../util/models/setConfention_db");

router.get("/", (req, res) => {
  res.render("home", {
    user: req.user,
    esta: true,
  });
});

router.get("/login", passport.authenticate("discord"), (req, res) => {
  res.redirect("/");
});

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
router.get("/rgl3", (req, res) => {
  res.render("./web/reglas/rgl3", {
    user: req.user,
    esta: true,
  });
});
router.get("/tienda", (req, res) => {
  res.render("./web/tienda", {
    user: req.user,
    esta: true,
  });
});
//Tienda
router.get("/tienda/existo", (req, res) => {
  res.render("./web/compra/discordbot", {
    user: req.user,
    esta: true,
  });
});
router.get("/tienda/discord/bot", (req, res) => {
  res.render("./web/compra/discordbot", {
    user: req.user,
    esta: true,
  });
  router.get("/tienda/discord/bot/s", (req, res) => {
    res.render("./web/compra/discord/s", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/tienda/discord/bot/a", (req, res) => {
    res.render("./web/compra/discord/a", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/tienda/discord/bot/m", (req, res) => {
    res.render("./web/compra/discord/m", {
      user: req.user,
      esta: true,
    });
  });
  router.get("/tienda/discord/bot/c", (req, res) => {
    res.render("./web/compra/discord/c", {
      user: req.user,
      esta: true,
    });
  });
});
router.get("/tienda/", (req, res) => {
  res.render("./web/tienda", {
    user: req.user,
    esta: true,
  });
});
router.get("/success/", (req, res) => {
  res.render("./web/compra/success/successBS", {
    user: req.user,
    esta: true,
  });
});
router.get("/tienda", (req, res) => {
  res.render("./web/tienda", {
    user: req.user,
    esta: true,
  });
});
router.get("/tienda", (req, res) => {
  res.render("./web/tienda", {
    user: req.user,
    esta: true,
  });
});
router.get("/dash", auth, (req, res) => {
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
      /*if (servidores.icon === null) {
        iconDefautl.push("https://cdn.discordapp.com/embed/avatars/0.png");
      } else {
        iconDefautl.push(
          `https://cdn.discordapp.com/icons/${servidores.id}/${servidores.icon}.png`
        );
      }*/
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

router.get(`/dash/:id`, auth, async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let custom;
  let data = await Prefix.findOne({ Guild: req.params.id }).catch((err) =>
    console.log(err)
  );
  if (data) {
    custom = data.Prefix;
  } else {
    custom = "&";
  }
  let suggest = await setSugerencia_db.findOne({ guild: req.params.id });
  let confection = await setConfention_db.findOne({ guild: req.params.id });
  let confectionL = await logsConfecion_db.findOne({ guild: req.params.id });
  let Bienvenidas = await bienvenidas_db.findOne({ guild: req.params.id });
  let WarnsL = await warn2_db.findOne({ guild: req.params.id });

  let predef = "No hay canal";
  let su;
  let co;
  let col;
  let bi;
  let wal;

  if (suggest === null) {
    su = predef;
  } else {
    su = req.BotClient.guilds.cache
      .get(id)
      .channels.resolve(suggest.ChannelID).name;
  }
  if (confection === null) {
    co = predef;
  } else {
    co = req.BotClient.guilds.cache
      .get(id)
      .channels.resolve(confection.ChannelID).name;
  }
  if (confectionL === null) {
    col = predef;
  } else {
    col = req.BotClient.guilds.cache
      .get(id)
      .channels.resolve(confectionL.ChannelID).name;
  }
  if (Bienvenidas === null) {
    bi = predef;
  } else {
    bi = req.BotClient.guilds.cache
      .get(id)
      .channels.resolve(Bienvenidas.ChannelID).name;
  }
  if (WarnsL === null) {
    wal = predef;
  } else {
    wal = req.BotClient.guilds.cache
      .get(id)
      .channels.resolve(WarnsL.ChannelID).name;
  }
  res.render("../views/dash/serverDash/dashserver", {
    user: req.user,
    servidor,
    prefixMostrar: custom,
    su,
    bi,
    wal,
    col,
    co,
  });
});

/*router.get(`/dash/:id/:exito`, auth, async (req, res) => {
  let id = req.params.id;
  let idEx = req.params.exito;
  let servidor = req.BotClient.guilds.cache.get(id);
  let custom;
  let data = await Prefix.findOne({ Guild: req.params.id }).catch((err) =>
    console.log(err)
  );
  if (idEx === "...") {
    console.log("PORQUE");
  }
  if (data) {
    custom = data.Prefix;
  } else {
    custom = "&";
  }
  console.log(idEx);
  let Exitoid;
  if (idEx === 1) {
    Exitoid = "Todavia no se cambia el prefix";
    idEx = 1;
    console.log("1");
  } else if (idEx === 2) {
    Exitoid = "Prefix cambiado correctamente!!";
    idEx = 2;
    console.log("2");
  } else if (idEx === 3) {
    Exitoid = "El prefix mide mucho, maximo 3";
    idEx = 3;
    console.log("3");
  } else if (idEx === 4) {
    Exitoid = "No colocastes ningun prefix";
    idEx = 4;
    console.log("4");
  }
  let iconDefautl;
  if (servidor.icon === null) {
    iconDefautl = "https://cdn.discordapp.com/embed/avatars/0.png";
  } else {
    iconDefautl = `https://cdn.discordapp.com/icons/${servidor.id}/${servidor.icon}.png`;
  }
  res.render("../views/dash/serverDash/dashserver", {
    user: req.user,
    servidor,
    prefixMostrar: custom,
    Exitoid,
    iconDefautl,
  });
});*/

router.post("/dash/:id/prefix", async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  var Exito = 10;
  let newPrefixPages = req.body.prefix;

  if (newPrefixPages.length === 0) {
    Exito = 4;
  } else if (newPrefixPages.length > 3) {
    Exito = 3; //"El prefix mide mucho, maximo 3";
  } else if (newPrefixPages.length < 3) {
    Exito = 2; //"Prefix cambiado correctamente!!";
    let a = await Prefix.findOne({ Guild: req.params.id });

    let sv = new Prefix({
      Guild: req.params.id,
      Prefix: newPrefixPages,
    });

    a
      ? await Prefix.updateOne(
          { Guild: req.params.id },
          { Prefix: newPrefixPages }
        )
      : await sv.save();
  } else {
    Exito = 1; //"Todavia no se cambia el prefix";
  }

  res.redirect(`/dash/${id}`);
});

router.post("/dash/:id/sugest", async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  var Exito = 10;
  let newPrefixPages = req.body.prefix;

  if (newPrefixPages.length === 0) {
    Exito = 4;
  } else if (newPrefixPages.length > 3) {
    Exito = 3; //"El prefix mide mucho, maximo 3";
  } else if (newPrefixPages.length < 3) {
    Exito = 2; //"Prefix cambiado correctamente!!";
    let a = await Prefix.findOne({ Guild: req.params.id });

    let sv = new Prefix({
      Guild: req.params.id,
      Prefix: newPrefixPages,
    });

    a
      ? await Prefix.updateOne(
          { Guild: req.params.id },
          { Prefix: newPrefixPages }
        )
      : await sv.save();
  } else {
    Exito = 1; //"Todavia no se cambia el prefix";
  }

  res.redirect(`/dash/${id}/${Exito}`);
});

module.exports = router;
