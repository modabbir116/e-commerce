import express, { Router } from "express";
import { creatUser, emaiVarified } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validationMiddleware.js";
const router = express.Router()

router.route("/user").post(validation, creatUser)
router.route("/user/:link").get(emaiVarified)

export default router