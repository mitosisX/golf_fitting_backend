import express from "express";
import {
  profiles,
  updateProfile,
} from "../controllers/admin/profileControllers.js";
import {
  updateInfo,
  viewInfo,
} from "../controllers/admin/gettingStartedController.js";
import {
  all_fittings,
  fitting_progress,
  fittings_for_calendar_view,
} from "../controllers/admin/fittingController.js";

const adminRouter = express.Router();

adminRouter.post("/admim/user/create", profiles);
adminRouter.post("/admin/user/fittings", profiles);

adminRouter.get("/admin/user/profiles", profiles);
adminRouter.post("/admin/profile/update", updateProfile);
adminRouter.get("/admin/getting-started-info", viewInfo);
adminRouter.put("/admin/getting-started-info", updateInfo);

// Fittings
adminRouter.get("/admin/fitting", all_fittings);
adminRouter.patch("/admin/fitting/status/:id", fitting_progress);
adminRouter.get("/admin/fitting/calendar/view", fittings_for_calendar_view);

export default adminRouter;
