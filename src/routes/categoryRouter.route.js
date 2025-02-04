import express, { Router } from "express";
import { auth } from "../middlewares/auth.middlewar.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { createCategory } from "../controllers/categoryController.js";


const router = express.Router()
// user admin create router
router.route("/categories/create").post(auth, adminAuth, createCategory)




export default router