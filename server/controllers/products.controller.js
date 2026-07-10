const products = require("../data/products.json");

exports.getProducts = (req, res, next) => {
  console.log(products.cameras);
  res.json(products);
};

exports.getCameras = (req, res, next) => {
  res.json(products.cameras);
};

exports.getPlans = (req, res, next) => {
  res.json(products.plans);
};

exports.getSensors = (req, res, next) => {
  res.json(products.sensors);
};

exports.getAccessories = (req, res, next) => {
  res.json(products.accessories);
};
