import express from "express";
import isLoggedIn from "../middlewares/auth.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.js";

const router = express.Router();

router.post("/post", isLoggedIn, postJob);
router.get("/get", isLoggedIn, getAllJobs);
router.get("/get/:id", isLoggedIn, getJobById);
router.get("/getadminjobs", isLoggedIn, getAdminJobs);

export default router;