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

  all: publicProcedure
    .input(
      z.object({
        name: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const all = await ctx.prisma.user.findMany({
        where: {
          name: {
            contains: input.name,
            mode: "insensitive",
          },
        },
        include: {
          followedBy: true,
        },
        cursor: cursor ? { id: cursor } : undefined,
        take: limit + 1,
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (all.length > limit) {
        const nextItem = all.pop();
        nextCursor = nextItem!.id;
      }
      return {
        all,
        nextCursor,
      };
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

  remove: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.prisma.user.delete({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
