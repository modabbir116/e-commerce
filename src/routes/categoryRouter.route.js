import express, { Router } from "express";
import { auth } from "../middlewares/auth.middlewar.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";


const router = express.Router()
// user admin create router
router.route("/categories/create").post(auth, adminAuth)




export default router