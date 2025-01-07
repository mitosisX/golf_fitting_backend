import express from "express";
import { updateProfile } from "../controllers/admin/profileControllers.js";
import { requiresAuth } from "../middlewares/authMiddleware.js";

const profileRouter = express.Router();

profileRouter.put("/update_profile", requiresAuth, updateProfile);

export default profileRouter;
