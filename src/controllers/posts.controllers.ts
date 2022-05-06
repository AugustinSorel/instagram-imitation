import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import PostError from "../errors/post.error";
import PostModel from "../models/Post.model";
import UserModel from "../models/User.model";
import { AddNewPostSchema, LikePostSchema } from "../schemas/posts.schema";
import { uploadPost } from "../services/cloudinary.service";
import {
  decrementLike,
  findAllPosts,
  incrementLike,
  postNewPost,
  pullPostLikedUser,
  pushPostLikedUser,
} from "../services/post.service";
import {
  userPullPostLiked,
  userPushNewPost,
  userPushPostLiked,
} from "../services/user.service";

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

    await userPushNewPost(res.locals.userId, postCreated._id.toString());

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

export const likePost = async (
  req: Request<LikePostSchema, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const userId = res.locals.userId;

    const userLikedPost = await UserModel.findById(userId).select("postsLiked");

    if (!userLikedPost) {
      return res.status(404).json({ message: "😢 userLikedPost is null" });
    }

    if (
      userLikedPost.postsLiked.includes(new mongoose.Types.ObjectId(postId))
    ) {
      await userPullPostLiked(userId, postId);
      await decrementLike(postId);
      await pullPostLikedUser(postId, userId);
    } else {
      await userPushPostLiked(userId, postId);
      await incrementLike(postId);
      await pushPostLikedUser(postId, userId);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in likePost", error);
    res.sendStatus(500);
  }
};
