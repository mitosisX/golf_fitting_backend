import express from "express";
import { get, update } from "../controllers/consumer/profileController.js";
import { schedule } from "../controllers/consumer/fittingController.js";

const consumerRouter = express.Router();

consumerRouter.post("/consumer/fitting/create", get);
consumerRouter.post("/consumer/fitting/view", get);
consumerRouter.post("/consumer/profile/update", update);
consumerRouter.get("/consumer/profile/:id/view", get);

// Fittings
consumerRouter.post("/consumer/fitting/schedule-swig-analysis", schedule);

export default consumerRouter;
