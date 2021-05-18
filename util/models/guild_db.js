const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: { type: String },
  prefix: { type: String, default: "&" },
  cmds: { type: Number, default: 0 },
  premiun: { type: Boolean, default: false },
  bienv: {
    id: { type: String, default: "Canal no definido" },
    text: { type: String, default: "Nuevo miembro en el servidor!!" },
  },
});
module.exports = mongoose.model("guild_data", schema);
