import User from "./user";

type Post = {
  _id: string;
  createdBy: User;
  url: string;
  likes: number;
  likedBy: [string];
};

export default Post;
