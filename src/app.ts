import express from "express";
import eventRoutes from "./api/v1/routes/event.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use("/api/v1/events", eventRoutes);

export default app;// Event Registration API
