import axios from "axios";

const API_URI =
  process.env.REACT_APP_BACKEND_URI || "http://localhost:5000/api";

const postsApi = axios.create({
  baseURL: `${API_URI}/posts`,
  withCredentials: true,
});

export const addNewPost = async (post: FormData) => {
  const res = await postsApi.post("/add-new-post", post);

  return res.data;
};
