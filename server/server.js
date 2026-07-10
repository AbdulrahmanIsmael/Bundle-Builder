const express = require("express");
const cors = require("cors");

const app = express();

// routers
const productsRouter = require("./routes/products.routes");

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", productsRouter);

// handle unregistered routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
