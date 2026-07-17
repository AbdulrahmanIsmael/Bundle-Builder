import {
  getAccessories,
  getCameras,
  getPlans,
  getProducts,
  getSensors,
} from "../controllers/products.controller";

import express from "express";

const router = express.Router();

router.get("/", getProducts);

router.get("/products", getProducts);

router.get("/cameras", getCameras);

router.get("/plans", getPlans);

router.get("/sensors", getSensors);

router.get("/accessories", getAccessories);

export default router;
