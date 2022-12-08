const axios = require("axios");

const orders = require("../util/data/buyments");

const {

  PAYPAL_API,

  PAYPAL_API_CLIENT,

  PAYPAL_API_SCRRET,

} = require("../config/config");



module.exports.createOrder = async (req, res) => {

  try {

    let order = orders[req.params.id];



    const params = new URLSearchParams();

    params.append("grant_type", "client_credentials");



    const {

      data: { access_token },

    } = await axios.post(

      `https://api-m.sandbox.paypal.com/v1/oauth2/token`,

      params,

      {

        headers: {

          "Content-Type": "application/x-www-form-urlencoded",

        },

        auth: {

          username: PAYPAL_API_CLIENT,

          password: PAYPAL_API_SCRRET,

        },

      }

    );



    const response = await axios.post(

      `${PAYPAL_API}/v2/checkout/orders`,

      order,

      {

        headers: {

          Authorization: `Bearer ${access_token}`,

        },

      }

    );

    res.json(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).send("Something goes wrong");

  }

};

module.exports.captureOrder = async (req, res) => {

  const { token, PayerID } = req.query;

  const params = new URLSearchParams();

  params.append("grant_type", "client_credentials");



  const {

    data: { access_token },

  } = await axios.post(

    `https://api-m.sandbox.paypal.com/v1/oauth2/token`,

    params,

    {

      headers: {

        "Content-Type": "application/x-www-form-urlencoded",

      },

      auth: {

        username: PAYPAL_API_CLIENT,

        password: PAYPAL_API_SCRRET,

      },

    }

  );

  const response = await axios.post(

    `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,

    {},

    {

      headers: {

        Authorization: `Bearer ${access_token}`,

      },

    }

  );

  res.send("capture order");

};

module.exports.cancelOrder = (req, res) => {

  res.send("cancel order");

};