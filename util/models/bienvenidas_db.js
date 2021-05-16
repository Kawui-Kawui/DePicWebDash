const mongoose = require("mongoose");
const Bienvenida = mongoose.Schema({
  guild: String,
  ChannelID: {
    type: String,
    default: "No hay canal establesido",
  },
});
module.exports = mongoose.model("Bienvenida", Bienvenida);
