import { NextFunction, Request, Response } from "express";
import AuthError from "../errors/auth.error";
import PostError from "../errors/post.error";
import PostModel from "../models/Post.model";
import UserModel from "../models/User.model";
import { AddNewPostSchema } from "../schemas/posts.schema";
import { uploadPost } from "../services/cloudinary.service";
import { findById, userAddNewPost } from "../services/user.service";

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

    await userAddNewPost(res.locals.userId, newPostUrl);

    res.sendStatus(200);
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
    const user = await findById(res.locals.userId);

    if (!user) {
      return next(AuthError.invalidIdError());
    }

    const userPosts = user.posts;

    const posts = await PostModel.find({ _id: { $in: userPosts } });

    res.json(posts);
  } catch (error) {
    console.log("ERROR in getUserPosts", error);
    res.sendStatus(500);
  }
};
