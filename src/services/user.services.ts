import User from "../models/User";
import { UserSignUpSchema } from "../schemas/user.schema";

export const createUser = (user: UserSignUpSchema) => {
  return User.create(user);
};
