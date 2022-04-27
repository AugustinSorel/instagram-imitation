import axios from "axios";

const API_URI =
  process.env.REACT_APP_BACKEND_URI || "http://localhost:5000/api";

const userApi = axios.create({
  baseURL: `${API_URI}/users`,
});

export const createUser = async () => {
  console.log("ehj");

  const res = await userApi.post("/");

  return res.data;
};
