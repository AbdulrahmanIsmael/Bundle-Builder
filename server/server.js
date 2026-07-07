const express = require("express");
const cors = require("cors");

const products = require("./data/products.json");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res, next) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
