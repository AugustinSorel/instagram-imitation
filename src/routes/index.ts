import express from "express";
import usersRouter from "./users.routes";

const router = express.Router();

router.get("/health-check", (req, res) => {
  res.sendStatus(200);
});

router.use("/users", usersRouter);

export default router;
