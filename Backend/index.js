import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import { connectDB } from "./DB/mongoDB.js";
import userRouter from "./Routers/userRoutes.js";
import postRouter from "./Routers/postRoutes.js";
dotenv.config()

const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user",userRouter);
app.use("/api/post", postRouter);

const port=process.env.PORT || 4000

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
