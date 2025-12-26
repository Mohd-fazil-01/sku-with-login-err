import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.js";   // ✅ ADD
import passwordRoutes from "./routes/password.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

const MONGO_URL =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/lostfound";

// Middlewares
// app.use(cors({
//   origin: "*",
//   credentials: true
// }));
app.use(
  cors({
    origin: "http://localhost:5173", // frontend exact URL
    credentials: true,               // cookies allow
  })
);


app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);       // ✅ LOGIN
app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);

app.get("/", (req, res) => res.send("Server running successfully"));

app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server started on port ${PORT}`);
});
