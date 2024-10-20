import express, { Router } from "express";
import { creatUser, emaiVarified, login } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validationMiddleware.js";
const router = express.Router()

router.route("/user").post(validation, creatUser)
router.route("/user/:link").get(emaiVarified)
router.route("/user/login").post(login)


export default router