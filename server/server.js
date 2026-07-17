import cors from "cors";
import express from "express";
import productRouter from "./routes/products.routes.JS";

const app = express();

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

export default app;
