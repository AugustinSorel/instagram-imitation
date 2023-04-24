import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const UserRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.user.findUnique({
        where: { id: input.id },
        include: {
          followedBy: true,
          following: true,
          _count: {
            select: {
              posts: true,
            },
          },
        },
      });
    }),

  follow: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.follows.create({
        data: {
          followerId: ctx.session.user.id,
          followingId: input.id,
        },
      });
    }),

  unfollow: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: ctx.session.user.id,
            followingId: input.id,
          },
        },
      });
    }),
});
