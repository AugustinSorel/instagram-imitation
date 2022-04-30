import axios from "axios";
import { AuthenticationFormState } from "../components/UIElements/authenticationForm/AuthenticationReducer";

const API_URI =
  process.env.REACT_APP_BACKEND_URI || "http://localhost:5000/api";

const userApi = axios.create({
  baseURL: `${API_URI}/users`,
});

export const createUser = async (user: AuthenticationFormState) => {
  const res = await userApi.post("/sign-up", user);

  return res.data;
};

export const loginUser = async (user: AuthenticationFormState) => {
  const res = await userApi.post("/login", user);

  return res.data;
};
