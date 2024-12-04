import express from "express";
import isLoggedIn from "../middlewares/auth.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.js";

const router = express.Router();

router.get("/apply/:id", isLoggedIn, applyJob);
router.get("/get", isLoggedIn, getAppliedJobs);
router.get("/:id/applicants", isLoggedIn, getApplicants);
router.post("/status/:id/update", isLoggedIn, updateStatus);

export default router;