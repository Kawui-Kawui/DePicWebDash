const POST_WARNL = async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let body = req.body;
  let member = servidor.members.cache.get(body.member);
  switch (body.type) {
    case "ban": {
      if (!member.bannable) {
        res.redirect(`/dash/${id}/warn`);
      } else {
        servidor.members.ban(body.member, {
          reason: "Baneado por demaciados warns desde la web",
        });
        res.redirect(`/dash/${id}/warn`);
      }
      break;
    }
    case "kick": {
      try {
        member
          .kick("Kick warns")
          .then(() => {})
          .catch((err) => {});
        res.redirect(`/dash/${id}/warn`);
      } catch (err) {
        res.redirect(`/dash/${id}/warn`);
      }
      break;
    }
    default: {
      res.redirect(`/dash/${id}/warn`);
    }
  }
};

module.exports = POST_WARNL;
