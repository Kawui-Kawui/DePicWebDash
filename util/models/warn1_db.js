const mongoose = require("mongoose");
const MessageSchema = mongoose.Schema({
  guildid: { type: String, required: true },
  role: { type: Boolean, required: true },
  roletime: { type: Number, default: null },
  roleid: { type: String, default: null },
  kick: { type: Boolean, required: true },
  kicktime: { type: Number, default: null },
  ban: { type: Boolean, required: true },
  bantime: { type: Number, default: null },
});
module.exports = mongoose.model("warn-system", MessageSchema);
