import express from "express";
import cors from "cors"
const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(cors({
    origin: "*",
    Credential: true
}))

// all routers 
import userRouter from "./routes/userRouter.route.js"
import categoryRouteer from "./routes/categoryRouter.route.js"
import subCategoryRouteer from "./routes/subCategoryRouter.route.js"
app.use("/api/v1/",userRouter)
app.use("/api/v1/",categoryRouteer)
app.use("/api/v1/",subCategoryRouteer)

export default app