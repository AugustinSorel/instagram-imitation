import axios from "axios";
import Post from "../types/post";
import getApiUri from "../utils/getApiUri";

const postsApi = axios.create({
  baseURL: `${getApiUri()}/posts`,
  withCredentials: true,
});

export const addNewPost = async (post: FormData) => {
  const res = await postsApi.post("/add-new-post", post);

  return res.data;
};

export const getAllPosts = async (): Promise<Post[]> => {
  const res = await postsApi.get("/");

  return res.data;
};

export const likePost = async (postId: string) => {
  const res = await postsApi.post(`/like-post/${postId}`);

  return res.data;
};
