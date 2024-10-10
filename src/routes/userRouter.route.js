import express, { Router } from "express";
import { creatUser } from "../controllers/userController.controller.js";
const router = express.Router()

router.route("/user").post(creatUser)

export default router