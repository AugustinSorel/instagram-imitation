import PostModel from "../models/Post.model";

export const addNewPost = (url: string) => {
  return PostModel.create({ url });
};
