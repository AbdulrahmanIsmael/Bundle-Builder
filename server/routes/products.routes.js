const express = require("express");

const router = express.Router();

const {
  getProducts,
  getCameras,
  getPlans,
  getSensors,
  getAccessories,
} = require("../controllers/products.controller");

router.get("/", getProducts);

router.get("/products", getProducts);

router.get("/cameras", getCameras);

router.get("/plans", getPlans);

router.get("/sensors", getSensors);

router.get("/accessories", getAccessories);

module.exports = router;
