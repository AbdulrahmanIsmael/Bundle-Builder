import cors from "cors";
import express from "express";
import productRouter from "./routes/products.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", productRouter);

// handle unregistered routes
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

export default app;
