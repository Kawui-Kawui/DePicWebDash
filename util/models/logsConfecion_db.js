const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  guild: String,
  ChannelID: {
    type: String,
    default: "No hay canal establesido",
  },
});
module.exports = mongoose.model("setconfessionslogs_data", schema);
