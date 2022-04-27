import axios from "axios";

const API_URI = process.env.REACT_APP_BACKEND_URI || "http://localhost:5000";

const userApi = axios.create({
  baseURL: `${API_URI}/api/users`,
});

export const createUser = async () => {
  const res = await userApi.post("/");

  return res.data;
};
