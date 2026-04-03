import express from "express"
import { login, profile, register } from "../Controllers/userController.js"
import {authMiddleware} from "../middleware/middleware.js";

const userRouter=express.Router()

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/profile",authMiddleware, profile);

export default userRouter