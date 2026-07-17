import products from "../data/products.json";

export const getProducts = (req, res, next) => {
  console.log(products.cameras);
  res.json(products);
};

export const getCameras = (req, res, next) => {
  res.json(products.cameras);
};

export const getPlans = (req, res, next) => {
  res.json(products.plans);
};

export const getSensors = (req, res, next) => {
  res.json(products.sensors);
};

export const getAccessories = (req, res, next) => {
  res.json(products.accessories);
};
