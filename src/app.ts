import express, { Request, Response } from "express";
import { helmetConfig } from "./config/helmet.config";
import { corsConfig } from "./config/cors.config";
import eventRoutes from "./api/v1/routes/event.routes";
import { swaggerUi, swaggerSpec } from "./config/swagger.config";

const app = express();

// Security middleware
app.use(helmetConfig);
app.use(corsConfig);

// Handle preflight requests
app.options("*", corsConfig);

// Body parsing
app.use(express.json());

// API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
  });
});

// Routes
app.use("/api/v1/events", eventRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

export default app;