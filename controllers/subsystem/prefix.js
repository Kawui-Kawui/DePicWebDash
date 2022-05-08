const POST_PREFIX = async (req, res) => {
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
};

module.exports = POST_PREFIX;
