import express from "express";
import {
  addNewPost,
  getExplorePosts,
  getUserLikedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.controllers";
import requireUser from "../middlewares/requireUser";
import validateRessource from "../middlewares/validateRessource.middleware";
import { addNewPostSchema, likePostSchema } from "../schemas/posts.schema";
import upload from "../utils/multer.util";

const postsRouter = express.Router();

postsRouter.get("/", requireUser, getUserPosts);
postsRouter.get("/posts-liked", requireUser, getUserLikedPosts);
postsRouter.get("/explore", requireUser, getExplorePosts);

postsRouter.post(
  "/add-new-post",
  requireUser,
  upload.single("post"),
  validateRessource(addNewPostSchema),
  addNewPost
);
postsRouter.post(
  "/like-post/:postId",
  requireUser,
  validateRessource(likePostSchema),
  likePost
);

export default postsRouter;
