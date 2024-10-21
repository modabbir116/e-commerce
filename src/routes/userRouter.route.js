import express, { Router } from "express";
import { creatUser, emaiVarified, login, userProfile } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validationMiddleware.js";
import {upload} from "../middlewares/multterMiddlesare.js"
const router = express.Router()
// user sinUp router
router.route("/user").post(validation, creatUser)
// email verification link router
router.route("/user/:link").get(emaiVarified)
// user login router
router.route("/user/login").post(login)
// user picture upload router
router.route("/user/update").post(upload.single('profilePic'), userProfile)


export default router