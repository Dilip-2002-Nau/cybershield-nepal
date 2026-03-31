/**
 * CyberShield Nepal - Main Server Entry Point
 * Express.js backend with MongoDB integration
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Validate environment configuration
const { initializeEnvironment } = require("./utils/configValidator");
const config = initializeEnvironment();

// Import routes
const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

// ========================
// Middleware
// ========================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5001",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Request logger (development only)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// ========================
// Database Connection
// ========================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ========================
// API Routes
// ========================
app.use("/api/auth", authRoutes);
app.use("/api", scanRoutes);
app.use("/api", reportRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "CyberShield Nepal API is running",
    timestamp: new Date().toISOString(),
  });
});

// ========================
// 404 Handler
// ========================
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ========================
// Global Error Handler
// ========================
app.use((err, req, res, next) => {
  const { logError, formatErrorResponse } = require("./utils/errorHandler");

  // Log the error with context
  logError(err, `${req.method} ${req.url}`);

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages[0] || "Validation error",
      errors: messages,
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `Duplicate entry for ${field}`,
      field,
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired",
    });
  }

  // Handle custom ErrorHandler errors
  if (err.statusCode) {
    return res.status(err.statusCode).json(formatErrorResponse(err));
  }

  // Generic server error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ========================
// Start Server
// ========================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 CyberShield Nepal server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
