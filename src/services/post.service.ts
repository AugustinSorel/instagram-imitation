import PostModel from "../models/Post.model";

export const postNewPost = (createdBy: string, url: string) => {
  return PostModel.create({ createdBy, url });
};

export const findAllPosts = (userId: string) => {
  return PostModel.find({ createdBy: userId }).sort({ createdAt: -1 });
};

export const incrementLike = (postId: string) => {
  return PostModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
};

export const decrementLike = (postId: string) => {
  return PostModel.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
};

export const pushPostLikedUser = (postId: string, userId: string) => {
  return PostModel.findByIdAndUpdate(postId, {
    $push: { likedBy: userId },
  });
};

export const pullPostLikedUser = (postId: string, userId: string) => {
  return PostModel.findByIdAndUpdate(postId, {
    $pull: { likedBy: userId },
  });
};
