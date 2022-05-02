import axios from "axios";
import { AuthenticationFormState } from "../components/UIElements/authenticationForm/AuthenticationReducer";
import User from "../types/user";

const API_URI =
  process.env.REACT_APP_BACKEND_URI || "http://localhost:5000/api";

const userApi = axios.create({
  baseURL: `${API_URI}/users`,
  withCredentials: true,
});

export const createUser = async (user: AuthenticationFormState) => {
  const res = await userApi.post("/sign-up", user);

  return res.data;
};

export const loginUser = async (user: AuthenticationFormState) => {
  const res = await userApi.post("/login", user);

  return res.data;
};

export const getUser = async (): Promise<User> => {
  const res = await userApi.get("/");

  return res.data;
};

export const logoutUser = async () => {
  const res = await userApi.post("/logout");

  return res.data;
};
