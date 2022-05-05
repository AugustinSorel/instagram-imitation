import { NextFunction, Request, Response } from "express";
import PostError from "../errors/post.error";
import { AddNewPostSchema } from "../schemas/posts.schema";
import { uploadPost } from "../services/cloudinary.service";

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
    console.log(newPost.public_id);

    res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in addNewPost", error);
    res.sendStatus(500);
  }
};
