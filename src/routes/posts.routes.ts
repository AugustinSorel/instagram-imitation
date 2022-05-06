import express from "express";
import { addNewPost, getUserPosts } from "../controllers/posts.controllers";
import requireUser from "../middlewares/requireUser";
import validateRessource from "../middlewares/validateRessource.middleware";
import { addNewPostSchema } from "../schemas/posts.schema";
import upload from "../utils/multer.util";

const postsRouter = express.Router();

postsRouter.get("/", requireUser, getUserPosts);

postsRouter.post(
  "/add-new-post",
  requireUser,
  upload.single("post"),
  validateRessource(addNewPostSchema),
  addNewPost
);

export default postsRouter;
