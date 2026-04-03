import express from "express";
import { comment, create, getPost, like } from "../Controllers/postController.js";
import { upload } from "../cloudinary/multer.js";

const postRouter = express.Router();

postRouter.post("/create", upload.single("image"), create);
postRouter.get("/get",  getPost);
postRouter.post("/like",  like);
postRouter.post("/comment",  comment);

export default postRouter;
