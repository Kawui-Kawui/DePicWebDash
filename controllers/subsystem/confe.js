const POST_CONFE = async (req, res) => {
  let id = req.params.id;
  let servidor = req.BotClient.guilds.cache.get(id);
  let newPrefixPages = req.body;
  if (newPrefixPages.confe) {
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
};

module.exports = POST_CONFE;
