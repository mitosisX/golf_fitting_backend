import express from "express";
import {
  profiles,
  updateProfile,
} from "../controllers/admin/profileControllers.js";

const adminRouter = express.Router();

adminRouter.post("/admim/user/create", profiles);
adminRouter.post("/admin/user/fittings", profiles);

adminRouter.get("/admin/user/profiles", profiles);
adminRouter.post("/admin/profile/update", updateProfile);

export default adminRouter;
