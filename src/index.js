import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./db/db.js";
import adminRouter from "./routes/adminRoutes.js";
import consumerRouter from "./routes/consumerRoutes.js";

const app = express();

// configures the .env file
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/", authRoutes, adminRouter, consumerRouter);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Running");
});
