import express from "express";
import { userSignUp } from "../controllers/users.controllers";
import validateRessource from "../middlewares/validateRessource.middleware";
import { userSignUpSchema } from "../schemas/user.schema";

const usersRouter = express.Router();

usersRouter.post("/", validateRessource(userSignUpSchema), userSignUp);

export default usersRouter;
