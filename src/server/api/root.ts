import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "./routers/post";
import { mediaRouter } from "./routers/media";
import { UserRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  media: mediaRouter,
  user: UserRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
