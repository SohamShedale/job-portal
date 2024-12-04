import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.js";
import isLoggedIn from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", isLoggedIn, registerCompany);
router.get("/get", isLoggedIn, getCompany);
router.get("/get/:id", isLoggedIn, getCompanyById);
router.put("/update/:id", isLoggedIn, singleUpload, updateCompany);

export default router;