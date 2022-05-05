import axios from "axios";
import { AuthenticationFormState } from "../components/UIElements/authenticationForm/AuthenticationReducer";
import User from "../types/user";
import getApiUri from "../utils/getApiUri";

const userApi = axios.create({
  baseURL: `${getApiUri()}/users`,
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

export const updateUser = async (user: FormData) => {
  const res = await userApi.patch("/", user);

  return res.data;
};

export const deleteUser = async () => {
  const res = await userApi.delete("/");

  return res.data;
};
