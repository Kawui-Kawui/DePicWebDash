const guild_db = require("../../util/models/guild_db");
const confe_db = require("../../util/models/setConfention_db");
const confe_logs_db = require("../../util/models/logsConfecion_db");
const sugest_db = require("../../util/models/setSugerencia_db");

const POST_CONFEL = async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let body = req.body;

  let a = await guild_db.findOne({ id: id });
  let e = await confe_db.findOne({ guild: id });
  let i = await confe_logs_db.findOne({ guild: id });
  let o = await sugest_db.findOne({ guild: id });

  if (body.logs === "true") {
    let sv = new guild_db({
      id: id,
      logs: { enabled: true },
    });
    a
      ? await guild_db.updateOne({ id: id }, { $set: { "logs.enabled": true } })
      : await sv.save();
  } else {
    let sv = new guild_db({
      id: id,
      logs: { enabled: false },
    });
    a
      ? await guild_db.updateOne(
          { id: id },
          { $set: { "logs.enabled": false } }
        )
      : await sv.save();
  }

  if (body.logsid) {
    let sv = new guild_db({
      id: id,
      logs: { id: body.logsid },
    });
    a
      ? await guild_db.updateOne(
          { id: id },
          { $set: { "logs.id": body.logsid } }
        )
      : await sv.save();
  }

  if (body.confeid) {
    let sv = new confe_db({
      guild: id,
      ChannelID: body.confeid,
    });
    e
      ? await confe_db.updateOne({ guild: id }, { ChannelID: body.confeid })
      : await sv.save();
  }

  if (body.confeLid) {
    let sv = new confe_logs_db({
      guild: id,
      ChannelID: body.confeLid,
    });
    i
      ? await confe_logs_db.updateOne(
          { guild: id },
          { ChannelID: body.confeLid }
        )
      : await sv.save();
  }

  if (body.sugeid) {
    let sv = new confe_db({
      guild: id,
      ChannelID: body.sugeid,
    });
    o
      ? await confe_db.updateOne({ guild: id }, { ChannelID: body.sugeid })
      : await sv.save();
  }
  console.log(body);
  res.redirect(`/dash/${id}/logs`);
};

module.exports = POST_CONFEL;
