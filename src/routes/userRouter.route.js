import express, { Router } from "express";
import { creatUser, emaiVarified, login, logOut, userProfile } from "../controllers/userController.controller.js";
import { validation } from "../middlewares/validationMiddleware.js";
import {upload} from "../middlewares/multterMiddlesare.js"
import { auth } from "../middlewares/auth.middlewar.js";
import { adminAuth } from "../middlewares/adminAuthMiddleware.js";
const router = express.Router()
// all user router
router.route("/users").post(creatUser)
// user sinUp router
router.route("/users/create").post(validation, creatUser)
// email verification link router
router.route("/users/:link").get(emaiVarified)
// logout router 
router.route("/users/logout").post(auth, logOut)
// user picture upload router
router.route("/users/update").post(auth, upload.single('profilePic'), userProfile)
// user login router
router.route("/users/login").post(login)




export default router