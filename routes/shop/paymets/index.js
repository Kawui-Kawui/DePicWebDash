const { Router } = require("express");
const router = Router();
const {
  cancelOrder,
  captureOrder,
  createOrder,
} = require("../../../controllers/paymets.controllers");

router.post("/create/:id", (req, res) => createOrder(req, res));

router.get("/accept", (req, res) => captureOrder(req, res));

router.get("/cancel", (res, req) => cancelOrder(req, res));

module.exports = router;
