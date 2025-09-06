// index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import all route files
const uploadRoutes = require("./routes/upload");
const predictRoutes = require("./routes/predict");
const feedbackRoutes = require("./routes/feedback");
const historyRoutes = require("./routes/history");
const authRoutes = require("./routes/auth");

const db = require("./config/db"); // ✅ use SQLite db instead of PostgreSQL pool

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req, res) => {
    res.json({ message: "🌱 Crop Disease Backend is running 🚀" });
});

// Routes
app.use("/upload", uploadRoutes);
app.use("/predict", predictRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/history", historyRoutes);
app.use("/auth", authRoutes);

// Start server after DB connection check
const startServer = () => {
    db.get("SELECT 1", (err) => {
        if (err) {
            console.error("❌ Database connection failed:", err.message);
            process.exit(1);
        } else {
            console.log("✅ SQLite database connected.");
            app.listen(PORT, () => {
                console.log(`🚀 Backend running on port ${PORT}`);
            });
        }
    });
};

startServer();
