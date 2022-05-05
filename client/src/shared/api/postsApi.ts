import axios from "axios";
import getApiUri from "../utils/getApiUri";

const postsApi = axios.create({
  baseURL: `${getApiUri()}/posts`,
  withCredentials: true,
});

export const addNewPost = async (post: FormData) => {
  const res = await postsApi.post("/add-new-post", post);

  return res.data;
};
