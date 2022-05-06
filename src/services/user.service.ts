import User from "../models/User.model";
import { UserSignUpSchema } from "../schemas/user.schema";

export const createUser = (user: UserSignUpSchema) => {
  return User.create(user);
};

export const findByEmail = (email: string) => {
  return User.findOne({ email });
};

export const findById = (id: string) => {
  return User.findById(id);
};

export const incrementTheRefreshTokenCount = (userId: string) => {
  return User.findByIdAndUpdate(userId, {
    $inc: { refreshTokenCount: 1 },
  });
};

export const findOne = (query: any) => {
  return User.findOne(query);
};

export const deleteUserById = (userId: string) => {
  return User.findByIdAndDelete(userId);
};

export const pushNewPost = (userId: string, newPostId: string) => {
  return User.findByIdAndUpdate(userId, {
    $push: { postsLiked: newPostId },
  });
};

export const pullPost = (userId: string, postId: string) => {
  return User.findByIdAndUpdate(userId, {
    $pull: { postsLiked: postId },
  });
};
