const { Router } = require("express");
const router = Router();
const { auth } = require("../../../util/middleware/auth");

const warn2_db = require("../../../util/models/warn2_db");
const guildShcema = require("../../../util/models/guild_db");
const setConfention_db = require("../../../util/models/setConfention_db");
const logsConfecion_db = require("../../../util/models/logsConfecion_db");
const setSugerencia_db = require("../../../util/models/setSugerencia_db");
let rolesFind = require("../../../public/js/roles");

const GET_ID = async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let custom;
  let premium;
  let guildfinds = await guildShcema.findOne({ id: req.params.id });
  let warn = await warn2_db.findOne({ guild: id });
  let suggest = await setSugerencia_db.findOne({ guild: id });
  let confL = await logsConfecion_db.findOne({ guild: id });
  let conf = await setConfention_db.findOne({ guild: id });
  let warnid;
  let confid;
  let confLid;
  let suggestid;
  let bienvid;
  let logsid;
  let nick;
  if (!guildfinds) {
    let sv = new guildShcema({
      id: id,
    });
    await sv.save();
  }

  if (!warn) {
    warnid = null;
  } else warnid = warn.ChannelID;
  if (!conf) {
    confid = null;
  } else confid = conf.ChannelID;
  if (!confL) {
    confLid = null;
  } else confLid = confL.ChannelID;
  if (!suggest) {
    suggestid = null;
  } else suggestid = suggest.ChannelID;

  if (!guildfinds.bienv.id) {
    bienvid = null;
  } else bienvid = guildfinds.bienv.id;
  if (!warn) {
    logsid = null;
  } else logsid = guildfinds.logs.id;

  if (!servidor.members.cache.get("763582048995639296").nickname) {
    nick = "DePic";
  } else nick = servidor.members.cache.get("763582048995639296").nickname;

  function findNameChannel(id) {
    try {
      if (id === null) {
        return "Sin canal";
      } else if (id === "") {
        return "Sin canal";
      }
      return servidor.channels.cache.get(id).name;
    } catch (err) {
      return "Sin canal";
    }
  }

  if (guildfinds) {
    if (guildfinds.prefix === null) {
      custom = "&";
    } else if (guildfinds.prefix === "") {
      custom = "&";
    } else {
      custom = guildfinds.prefix;
    }
  } else {
    custom = "&";
  }

  if (guildfinds) {
    if (!guildfinds.premiun) {
      premium = null;
    } else {
      premium = guildfinds.premiun;
    }
  } else {
    premium === null;
  }
  let config = {
    warns: findNameChannel(warnid),
    confection: findNameChannel(confid),
    confectionLogs: findNameChannel(confLid),
    sugerencias: findNameChannel(suggestid),
    welcome: findNameChannel(bienvid),
    logs: findNameChannel(logsid),
  };
  let success = {
    type: "NOT",
    msg: "Ningun cambio realizado",
  };

  let data = {
    prefix: custom,
    id: id,
    members: servidor.members.cache.filter((e) => e.user.bot === false).size,
    bots: servidor.members.cache.filter((e) => e.user.bot === true).size,
    textChannel: servidor.channels.cache.filter((e) => e.type === "GUILD_TEXT")
      .size,
    voiceChannel: servidor.channels.cache.filter(
      (e) => e.type === "GUILD_VOICE"
    ).size,
    tier: servidor.premiumTier,
    MFA: servidor.mfaLevel === "NONE" ? "Ninguno" : "Activado",
    verification: servidor.verificationLevel,
    name: nick,
  };
  res.render("../views/dash/serverDash/dashserver", {
    user: req.user,
    servidor,
    data,
    config,
    success,
    layout: `dash`,
  });
};

module.exports = { router, GET_ID };
