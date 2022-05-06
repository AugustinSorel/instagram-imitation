import { NextFunction, Request, Response } from "express";
import PostError from "../errors/post.error";
import { AddNewPostSchema } from "../schemas/posts.schema";
import { uploadPost } from "../services/cloudinary.service";
import { findAllPosts, postNewPost } from "../services/post.service";
import { pushNewPost } from "../services/user.service";

export const addNewPost = async (
  req: Request<{}, {}, AddNewPostSchema>,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(PostError.postIsMissingError());
  }

  try {
    const newPost = await uploadPost(req.file.path);
    const newPostUrl = newPost.secure_url;

    const postCreated = await postNewPost(res.locals.userId, newPostUrl);

    await pushNewPost(res.locals.userId, postCreated._id);

    res.json(postCreated);
  } catch (error) {
    console.log("ERROR in addNewPost", error);
    res.sendStatus(500);
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userPosts = await findAllPosts(res.locals.userId);

    res.json(userPosts);
  } catch (error) {
    console.log("ERROR in getUserPosts", error);
    res.sendStatus(500);
  }
};
