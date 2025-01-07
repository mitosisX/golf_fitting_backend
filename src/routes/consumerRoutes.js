import express from "express";
import { get, update } from "../controllers/consumer/profileController.js";
import {
  consumer_fittings,
  fitting_progress,
  schedule_fitting,
  schedule_swig,
} from "../controllers/consumer/fittingController.js";

const consumerRouter = express.Router();

consumerRouter.post("/consumer/profile/update", update);
consumerRouter.get("/consumer/profile/:id/view", get);

// Fittings
consumerRouter.get("/consumer/fitting/:id", consumer_fittings);
consumerRouter.get("/consumer/fitting/progress/:id", fitting_progress);
consumerRouter.post("/consumer/fitting/schedule-swig-analysis", schedule_swig);
consumerRouter.post("/consumer/fitting/schedule-fitting", schedule_fitting);

export default consumerRouter;
