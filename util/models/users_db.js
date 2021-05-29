const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  id: { type: String },
  emojisAll: { type: Number },
  coins: { type: Number },
  premiun: { type: Boolean, default: false },
  back: Boolean,
  badges: {
    dev: { type: Boolean, default: false },
    sport: { type: Boolean, default: false },
    mod: { type: Boolean, default: false },
    adm: { type: Boolean, default: false },
    vete: { type: Boolean, default: false },
    spon: { type: Boolean, default: false },
    gest: { type: Boolean, default: false },
  },
  perso: {
    color: { type: String },
    desc: { type: String },
  },
});
module.exports = mongoose.model("users_data", schema);
