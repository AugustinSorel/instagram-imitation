import PostModel from "../models/Post.model";

export const postNewPost = (createdBy: string, url: string) => {
  return PostModel.create({ createdBy, url });
};

export const findAllPosts = (userId: string) => {
  return PostModel.find({ createdBy: userId });
};
