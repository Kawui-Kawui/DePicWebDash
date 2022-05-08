const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    id: { type: String },
    prefix: { type: String, default: "&" },
    cmds: { type: Number, default: 0 },
    premiun: { type: Boolean, default: false },
    raid: { type: Boolean, default: false },
    automsg: { type: Boolean, default: false },
    lang: String,
    autorol: [],
    eco: {
        items: [{
            name: { type: String },
            id: { type: Number },
            efect: { type: Number },
            cost: { type: Number },
        }, ],
        coins: { type: Number, default: 0 },
    },
    bienv: {
        id: { type: String, default: null },
        text: { type: String, default: "Nuevo miembro en el servidor!!" },
        img: { type: String, default: null },
        color: { type: String, default: "#FFFFFF" },
        apodo: { type: String, default: null },
        onlyOneRol: { type: String },
        autorol: [{
            id: { type: String },
        }, ],
    },
    logs: {
        enabled: { type: Boolean, default: false },
        id: { type: String, default: "" },
    },
    mod: {
        ticket: {
            category: { type: String, default: "0" },
        },
        logs: {
            default: { type: String, default: "0" },
            ban: { type: String, default: "0" },
            warn: { type: String, default: "0" },
            kick: { type: String, default: "0" },
            mute: { type: String, default: "0" },
            unmute: { type: String, default: "0" },
        },
        mute: { type: String, default: "0" },
    },
});
module.exports = mongoose.model("guild_data", schema);