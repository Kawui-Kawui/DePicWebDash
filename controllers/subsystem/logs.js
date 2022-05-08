const guild_db = require("../../util/models/guild_db");
const confe_db = require("../../util/models/setConfention_db");
const confe_logs_db = require("../../util/models/logsConfecion_db");
const sugest_db = require("../../util/models/setSugerencia_db");

const POST_SUGEST = async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  const canales = [];
  const channels = servidor.channels.cache;

  channels.map((ch) => {
    if (ch.permissionsFor(req.BotClient.user).has("VIEW_CHANNEL")) {
      canales.push({ id: ch.id, name: ch.name });
    }
  });
  let a = await guild_db.findOne({ id: id });
  let e = await confe_db.findOne({ guild: id });
  let i = await confe_logs_db.findOne({ guild: id });
  let o = await sugest_db.findOne({ guild: id });

  try {
    var allConfig = {
      logs: {
        enabled: a.logs.enabled ? "checked" : "Desactivado" || "Desactivado",
        name: servidor.channels.cache.get(a.logs.id || "0") || "Ninguno",
        id: a.logs.id || null,
      },
      confe: {
        name: servidor.channels.cache.get(e.ChannelID || "0") || "Ninguno",
        id: e.ChannelID || null,
      },
      confeLogs: {
        name: servidor.channels.cache.get(i.ChannelID || "0") || "Ninguno",
        id: i.ChannelID || null,
      },
      sugest: {
        name: servidor.channels.cache.get(o.ChannelID || "0") || "Ninguno",
        id: o.ChannelID || null,
      },
    };
  } catch (err) {
    var allConfig = {
      logsId: {
        enabled: a.logs.enabled ? "checked" : "Desactivado" || "Desactivado",
        name: servidor.channels.cache.get(a.logs.id || "0") || "Ninguno",
        id: a.logs.id || null,
      },
      confe: {
        name: servidor.channels.cache.get(e.ChannelID || "0") || "Ninguno",
        id: e.ChannelID || null,
      },
      confeLogs: {
        name: servidor.channels.cache.get(i.ChannelID || "0") || "Ninguno",
        id: i.ChannelID || null,
      },
      sugest: {
        name: servidor.channels.cache.get(o.ChannelID || "0") || "Ninguno",
        id: o.ChannelID || null,
      },
    };
  }

  res.render("../views/dash/serverDash/complements/logs", {
    user: req.user,
    servidor,
    allConfig,
    canales,
    layout: `dash`,
  });
};

module.exports = POST_SUGEST;
