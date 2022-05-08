const warn1_db = require("../../util/models/warn1_db");
const warn_db = require("../../util/models/warn_db");
let rolesFind = require("../../public/js/roles");

const POST_WARNC = async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let parms = req.body;
  let a = await warn1_db.findOne({ guildid: req.params.id });
  let warnings = await warn_db.find({ guildid: id });

  let warnigs_members = [];

  let success = {
    type: "NOT",
    msg: "Ningun cambio realizado",
  };

  if (!a) {
    let schema = new warn1_db({ guildid: id });
    schema.save();

    success.type = "NEW";
    success.msg = "Se registro en la base de datos";
  }

  if (!warnings) {
    warnigs_members.push({ name: "Nadie " });
  } else {
    let firts = {
      warnings: 0,
      name: "Nadie",
      avar: "https://cdn.discordapp.com/attachments/763804175510929469/950710792439881728/0.png",
      id: null,
      in: true,
      guild: id,
      pos: "firts",
    };
    let seconds = {
      warnings: 0,
      name: "Nadie",
      avar: "https://cdn.discordapp.com/attachments/763804175510929469/950710792439881728/0.png",
      id: null,
      in: true,
      guild: id,
      pos: "seconds",
    };
    let third = {
      warnings: 0,
      avar: "https://cdn.discordapp.com/attachments/763804175510929469/950710792439881728/0.png",
      name: "Nadie",
      id: null,
      guild: id,
      in: true,
      pos: "third",
    };

    for (let i = 0; i < warnings.length; i++) {
      if (warnings[i].warnings > firts.warnings) {
        seconds.warnings = firts.warnings;

        firts.warnings = warnings[i].warnings;
        firts.name = servidor.members.cache.get(
          warnings[i].memberid
        ).user.username;
        firts.avar = servidor.members.cache
          .get(warnings[i].memberid)
          .user.avatarURL();
        firts.id = warnings[i].memberid;
      } else if (warnings[i].warnings > seconds.warnings) {
        third.warnings = seconds.warnings;

        seconds.warnings = warnings[i].warnings;
        seconds.name = servidor.members.cache.get(
          warnings[i].memberid
        ).user.username;
        seconds.avar = servidor.members.cache
          .get(warnings[i].memberid)
          .user.avatarURL();
        seconds.id = warnings[i].memberid;
      } else if (warnings[i] > third.warnings) {
        third.warnings = warnings[i].warnings;
        third.name = servidor.members.cache.get(
          warnings[i].memberid
        ).user.username;
        third.avar = servidor.members.cache
          .get(warnings[i].memberid)
          .user.avatarURL();
        third.id = warnings[i].memberid;
      }
    }

    if (!firts.id) {
      firts.in = null;
    }
    if (!seconds.id) {
      seconds.in = null;
    }
    if (!third.id) {
      third.in = null;
    }
    warnigs_members.push(firts, seconds, third);
  }

  const contadorA20 = [];
  for (let index = 0; index <= 10; index++) {
    contadorA20.push({ number: index });
  }

  try {
    var allConfig = {
      role: servidor.roles.cache.get(a.roleid).name || "Ninguno",
      roleTime: a.roletime || 0,
      roleA: a.role ? "Activado" : "Desactivado" || "Desactivado",
      ban: a.ban ? "Activado" : "Desactivado" || "Desactivado",
      bantime: a.bantime || 0,
      kick: a.kick ? "Activado" : "Desactivado" || "Desactivado",
      kicktime: a.kicktime || 0,
    };
  } catch (err) {
    var allConfig = {
      role: "Ninguno",
      roleTime: a.roletime || 0,
      roleA: a.role ? "Activado" : "Desactivado" || "Desactivado",
      ban: a.ban ? "Activado" : "Desactivado" || "Desactivado",
      bantime: a.bantime || 0,
      kick: a.kick ? "Activado" : "Desactivado" || "Desactivado",
      kicktime: a.kicktime || 0,
    };
  }
  let otherConfig = {
    role: null,
    roleName: "Ninguno",
    roleTime: 0,
    roleA: null,
    ban: null,
    bantime: 0,
    kick: null,
    kicktime: 0,
  };
  if (allConfig.role === "Ninguno") {
    otherConfig.role;
  } else {
    otherConfig.roleName = allConfig.role;
    otherConfig.role = a.roleid;
  }
  if (allConfig.roleTime === 0) {
    otherConfig.roleTime;
  } else {
    otherConfig.roleTime = allConfig.roleTime;
  }
  if (allConfig.roleA === "Desactivado") {
    otherConfig.roleA;
  } else {
    otherConfig.roleA = "checked";
  }
  if ((allConfig.ban = "Desactivado")) {
    otherConfig.ban;
  } else {
    otherConfig.ban = "checked";
  }
  if (allConfig.bantime === 0) {
    otherConfig.bantime;
  } else {
    otherConfig.bantime = allConfig.bantime;
  }
  if (allConfig.kick === "Activado") {
    otherConfig.kick = "checked";
  }
  if (allConfig.kicktime) {
    otherConfig.kicktime = allConfig.kicktime;
  }

  const roles = [];
  rolesFind.roles(req.BotClient.guilds.cache.get(id), roles);
  let index3 = roles.join("\n");

  res.render("../views/dash/serverDash/complements/warns", {
    user: req.user,
    id,
    servidor,
    allConfig,
    index3,
    success,
    roles,
    otherConfig,
    contadorA20,
    warnigs_members,
    layout: `dash`,
  });
};

module.exports = POST_WARNC;
