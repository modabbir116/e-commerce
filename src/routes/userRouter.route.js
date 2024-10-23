import express, { Router } from "express";
import { creatUser, emaiVarified, login, logOut, userProfile } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validationMiddleware.js";
import {upload} from "../middlewares/multterMiddlesare.js"
import { auth } from "../middlewares/auth.middlewar.js";
const router = express.Router()
// user sinUp router
router.route("/user/creat").post(validation, creatUser)
// email verification link router
router.route("/user/:link").get(emaiVarified)
// logout router 
router.route("/user/logout").post(logOut)
// user picture upload router
router.route("/user/update").post(auth, upload.single('profilePic'), userProfile)
// user login router
router.route("/user/login").post(login)



export default router