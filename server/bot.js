const { Client } = require("discord.js");
const client = new Client({ intents: 1983 });

const { token } = require("../config/config");

client.on("ready", () => {
  console.log("Bot Prendido en la web");
});

client.login(token);

module.exports = client;
