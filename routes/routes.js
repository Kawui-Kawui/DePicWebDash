const { Router } = require("express");
const passport = require("../server/passport");
const { auth } = require("../util/middleware/auth");
const router = Router();
const logsConfecion_db = require("../util/models/logsConfecion_db");
const setSugerencia_db = require("../util/models/setSugerencia_db");
const warn2_db = require("../util/models/warn2_db");
const warn1_db = require("../util/models/warn1_db");
const guildShcema = require("../util/models/guild_db");
const setConfention_db = require("../util/models/setConfention_db");
const userdata = require("../util/models/users_db");

let rolesFind = require("../public/js/roles");

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
    let guildfinds = await guildShcema.findOne({ id: req.params.id });
    const lepush = (q, c) => {
      if (c.type == "text") q.push({ name: c.name, id: c.id });
    };
    let categorias = servidor.channels.cache
      .filter((q) => q.type == "category")
      .sort((p, c) => p.position - c.position);
    let canales = [];
    servidor.channels.cache
      .filter((q) => q.type != "category")
      .filter((q) => !q.parentID)
      .sort((p, c) => p.position - c.position)
      .forEach((c) => lepush(canales, c));
    categorias.forEach((c) => {
      lepush(canales, c);
      servidor.channels.cache
        .filter((q) => q.parentID == c.id)
        .sort((p, c) => p.position - c.position)
        .forEach((c) => lepush(canales, c));
    });

    const roless = [];
    rolesFind.roles(req.BotClient.guilds.cache.get(id), roless);
    let index2 = canales.join("\n");
    let index3 = roless.join("\n");
    /* for (const key in guilds) {
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
  }*/

    if (guildfinds) {
      if (guildfinds.prefix === null) {
        custom = "&";
      } else {
        custom = guildfinds.Prefix;
      }
    } else {
      custom = "&";
    }
    let suggest = await setSugerencia_db.findOne({ guild: req.params.id });
    let confection = await setConfention_db.findOne({ guild: req.params.id });
    let confectionL = await logsConfecion_db.findOne({ guild: req.params.id });
    let WarnsL = await warn2_db.findOne({ guild: req.params.id });
    let WarnsC = await warn1_db.findOne({ guildid: req.params.id });

    let allConfig = {
      role: WarnsC.roleid,
      roleTime: WarnsC.roletime,
      roleA: WarnsC.role,
      ban: WarnsC.ban,
      bantime: WarnsC.bantime,
      kick: WarnsC.kick,
      kicktime: WarnsC.kicktime,
    };

    let predef = "No hay canal";
    let su;
    let co;
    let col;
    let bi;
    let wal;
    let bit;
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
    if (guildfinds === null) {
      bi = predef;
    } else {
      try {
        if (guildfinds.bienv.id === null) {
          bi = predef;
        } else {
          bi = req.BotClient.guilds.cache
            .get(id)
            .channels.resolve(guildfinds.bienv.id).name;
        }
      } catch (error) {
        bi = predef;
      }
    }
    if (confectionL === null) {
      col = predef;
    } else {
      col = req.BotClient.guilds.cache
        .get(id)
        .channels.resolve(confectionL.ChannelID).name;
    }
    if (WarnsL === null) {
      wal = predef;
    } else {
      wal = req.BotClient.guilds.cache
        .get(id)
        .channels.resolve(WarnsL.ChannelID).name;
    }
    const contadorA20 = [];
    for (let index = 0; index <= 15; index++) {
      contadorA20.push({ number: index });
    }

    res.render("../views/dash/serverDash/dashserver", {
      user: req.user,
      servidor,
      prefixMostrar: custom,
      su,
      bi,
      bit,
      wal,
      col,
      co,
      canales,
      index2,
      roless,
      contadorA20,
      allConfig,
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
      let a = await guildShcema.findOne({ id: req.params.id });

      let sv = new guildShcema({
        id: req.params.id,
        prefix: newPrefixPages,
      });

      a
        ? await guildShcema.updateOne(
            { id: req.params.id },
            { prefix: newPrefixPages }
          )
        : await sv.save();
    } else {
      Exito = 1; //"Todavia no se cambia el prefix";
    }

    res.redirect(`/dash/${id}`);
  });

  router.post("/dash/:id/idsss", async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let newPrefixPages = req.body;
    if (!newPrefixPages.idssass) {
      console.log("XD");
    } else if (newPrefixPages.idssass === "1") {
      console.log("XD");
    } else {
      let a = await setSugerencia_db.findOne({ guild: req.params.id });

      let sv = new setSugerencia_db({
        guild: req.params.id,
        ChannelID: newPrefixPages.idssass,
      });
      a
        ? await setSugerencia_db.updateOne(
            { guild: req.params.id },
            { ChannelID: newPrefixPages.idssass }
          )
        : await sv.save();
    }
    res.redirect(`/dash/${id}`);
  });

  router.post("/dash/:id/confe", async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let newPrefixPages = req.body;
    if (!newPrefixPages.confe) {
      console.log("XD");
    } else if (newPrefixPages.confe === "1") {
      console.log("XD");
    } else {
      let a = await setConfention_db.findOne({ guild: req.params.id });

      let sv = new setConfention_db({
        guild: req.params.id,
        ChannelID: newPrefixPages.confe,
      });
      a
        ? await setConfention_db.updateOne(
            { guild: req.params.id },
            { ChannelID: newPrefixPages.confe }
          )
        : await sv.save();
    }
    res.redirect(`/dash/${id}`);
  });

  router.post("/dash/:id/confel", async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let newPrefixPages = req.body;
    if (!newPrefixPages.confel) {
      console.log("XD");
    } else if (newPrefixPages.confel === "1") {
      console.log("XD");
    } else {
      let a = await logsConfecion_db.findOne({ guild: req.params.id });

      let sv = new logsConfecion_db({
        guild: req.params.id,
        ChannelID: newPrefixPages.confel,
      });
      a
        ? await logsConfecion_db.updateOne(
            { guild: req.params.id },
            { ChannelID: newPrefixPages.confel }
          )
        : await sv.save();
    }
    res.redirect(`/dash/${id}`);
  });

  router.post("/dash/:id/bienvenidas", async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let newPrefixPages = req.body;
    if (!newPrefixPages.bienvenidas) {
      console.log("XD");
    } else if (newPrefixPages.bienvenidas === "1") {
      console.log("XD");
    } else {
      let a = await guildShcema.findOne({ id: req.params.id });

      let sv = new guildShcema({
        bienv: {
          id: newPrefixPages.bienvenidas,
        },
        id: req.params.id,
      });
      a
        ? await guildShcema.updateOne(
            { id: req.params.id },
            {
              bienv: {
                id: newPrefixPages.bienvenidas,
              },
            }
          )
        : await sv.save();
    }
    res.redirect(`/dash/${id}`);
  });
  router.post("/dash/:id/warnl", async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let newPrefixPages = req.body;
    console.log(newPrefixPages);
    if (!newPrefixPages.warnl) {
      console.log("XD");
    } else if (newPrefixPages.warnl === "1") {
      console.log("XD");
    } else {
      let a = await warn2_db.findOne({ guild: req.params.id });

      let sv = new warn2_db({
        guild: req.params.id,
        ChannelID: newPrefixPages.warnl,
      });
      a
        ? await warn2_db.updateOne(
            { guild: req.params.id },
            { ChannelID: newPrefixPages.warnl }
          )
        : await sv.save();
    }
    console.log("Guardado");
    res.redirect(`/dash/${id}`);
  });
  router.post("/dash/:id/warnC", async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let newPrefixPages = req.body;
    console.log(newPrefixPages);
    console.log(newPrefixPages);
    if (!newPrefixPages.warnl) {
    } else if (newPrefixPages.warnl === "1") {
    } else {
      let a = await warn1_db.findOne({ guildid: req.params.id });

      let sv = new warn1_db({
        guildid: req.params.id,
        role: newPrefixPages.warnRA,
        roletime: newPrefixPages.warnRC,
        roleid: newPrefixPages.warnR,
        kick: newPrefixPages.warnKA,
        kicktime: newPrefixPages.warnKC,
        ban: newPrefixPages.warnBA,
        bantime: newPrefixPages.warnBC,
      });
      a
        ? await warn1_db.updateOne({
            guildid: req.params.id,
            role: newPrefixPages.warnRA,
            roletime: newPrefixPages.warnRC,
            roleid: newPrefixPages.warnR,
            kick: newPrefixPages.warnKA,
            kicktime: newPrefixPages.warnKC,
            ban: newPrefixPages.warnBA,
            bantime: newPrefixPages.warnBC,
          })
        : await sv.save();
    }
    console.log("Guardado");
    res.redirect(`/dash/${id}`);
  });
  /*router.post("/dash/:id/bienve", async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  var Exito = 10;
  let newPrefixPages = req.body.bienvenidatext;

  if (newPrefixPages.length === 0) {
    Exito = 4;
  } else if (newPrefixPages.length > 300) {
    Exito = 3; //"El prefix mide mucho, maximo 3";
  } else if (newPrefixPages.length < 1) {
    Exito = 2; //"Prefix cambiado correctamente!!";
    let a = await guildShcema.findOne({ id: req.params.id });

    let sv = new Prefix({
      id: req.params.id,
      text: newPrefixPages,
    });

    a
      ? await Prefix.updateOne({
          id: req.params.id,
          text: newPrefixPages,
        })
      : await sv.save();
  } else {
    Exito = 1; //"Todavia no se cambia el prefix";
  }

  res.redirect(`/dash/${id}/${Exito}`);
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
});*/

  /*router.get(`/dash/:id`, auth, async (req, res) => {
    let id = req.params.id;
    let servidor = req.BotClient.guilds.cache.get(id);
    let guildfinds = await guildShcema.findOne({ id: req.params.id });
    let custom;
    let data = await guildShcema
      .findOne({ id: req.params.id })
      .catch((err) => console.log(err));

    if (data) {
      custom = data.prefix;
    } else {
      custom = "&";
    }
    let suggest = await setSugerencia_db.findOne({ guild: req.params.id });
    let confection = await setConfention_db.findOne({ guild: req.params.id });
    let confectionL = await logsConfecion_db.findOne({ guild: req.params.id });
    let Bienvenidas = await guildShcema.findOne({ id: req.params.id });
    let WarnsL = await warn2_db.findOne({ guild: req.params.id });

    let predef = "No hay canal";
    let su;
    let co;
    let col;
    let bi;
    let wal;
    let bit;

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

    if (guildfinds === null) {
      bi = predef;
    } else {
      try {
        if (guildfinds.bienv.id === null) {
          bi = predef;
        } else {
          bi = req.BotClient.guilds.cache
            .get(id)
            .channels.resolve(guildfinds.bienv.id).name;
        }
      } catch (error) {
        bi = predef;
      }
    }
    if (confectionL === null) {
      col = predef;
    } else {
      col = req.BotClient.guilds.cache
        .get(id)
        .channels.resolve(confectionL.ChannelID).name;
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
      bit,
      wal,
      col,
      co,
      roless,
    });
  });*/

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
} catch (error) {
  res.render("./web/cmd");
}
module.exports = router;
