import express, { Router } from "express";
import { auth } from "../middlewares/auth.middlewar.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
import { createSubCategory } from "../controllers/subCategoryController.js";


const router = express.Router()
// user admin create router
router.route("/subcategories/create").post(auth, adminAuth, createSubCategory)




export default router