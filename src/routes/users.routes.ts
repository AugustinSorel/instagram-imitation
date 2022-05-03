import express from "express";
import {
  deleteUser,
  getUser,
  logout,
  updateUser,
  userLogin,
  userSignUp,
} from "../controllers/users.controllers";
import requireUser from "../middlewares/requireUser";
import validateRessource from "../middlewares/validateRessource.middleware";
import { userLoginSchema, userSignUpSchema } from "../schemas/user.schema";

const usersRouter = express.Router();

usersRouter.post("/sign-up", validateRessource(userSignUpSchema), userSignUp);
usersRouter.post("/login", validateRessource(userLoginSchema), userLogin);
usersRouter.post("/logout", requireUser, logout);

usersRouter.get("/", requireUser, getUser);

usersRouter.patch(
  "/",
  requireUser,
  validateRessource(userSignUpSchema),
  updateUser
);

usersRouter.delete("/", requireUser, deleteUser);

export default usersRouter;
