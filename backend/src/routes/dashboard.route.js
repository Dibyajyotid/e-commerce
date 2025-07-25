import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", protectRoute, getDashboardStats);

export default router;
