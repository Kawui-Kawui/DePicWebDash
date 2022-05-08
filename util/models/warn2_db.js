const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    guild: String,
    ChannelID: {
        type: String,
        default: null,
    },
});
module.exports = mongoose.model("warns_logs", schema);