import express from "express";
import {register, login, logout, update} from "../controllers/user.js"
import isLoggedIn from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register",singleUpload, register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile/update", isLoggedIn, singleUpload, update);

export default router;