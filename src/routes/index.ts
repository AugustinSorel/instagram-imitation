import express from "express";
import postsRouter from "./posts.routes";
import usersRouter from "./users.routes";

const router = express.Router();

router.get("/health-check", (req, res) => {
  res.sendStatus(200);
});

router.use("/users", usersRouter);
router.use("/posts", postsRouter);

export default router;
