import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const UserRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
    }),

  posts: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
        where: {
          userId: input.id,
        },
        include: {
          user: true,
          likes: true,
          bookmarks: true,
          comments: {
            include: { user: true },
            orderBy: { createdAt: "desc" },
            take: 10,
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),
});
