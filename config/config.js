require("dotenv").config();

module.exports = {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  scope: ["identify", "guilds"],
  token: process.env.token,
  mongodb: process.env.mongo,
  PAYPAL_API_SCRRET: process.env.PAYPAL_API_SCRRET,
  PAYPAL_API_CLIENT: process.env.PAYPAL_API_CLIENT,
  PAYPAL_API: process.env.PAYPAL_API,
};
