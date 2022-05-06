import Post from "./post";

type User = {
  _id?: string;
  username: string;
  email: string;
  age: string;
  password: string;
  avatar: string;
  posts: string[];
  postsLiked: string[];
};

export default User;
