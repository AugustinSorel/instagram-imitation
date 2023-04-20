import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  newPost: protectedProcedure
    .input(
      z.object({
        location: z
          .string({ required_error: "location is required" })
          .min(1, "location must be at least one character")
          .max(255, "location must be at least 255 characters"),
        description: z
          .string({ required_error: "description is required" })
          .min(1, "location must be at least one character")
          .max(2047, "location must be at least 255 characters"),
        images: z
          .string()
          .url()
          .array()
          .min(1, "minimum of one image is allowed")
          .max(5, "maximum of five images is allowed"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.create({
        data: { ...input, userId: ctx.session.user.id },
      });
    }),

  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
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

  like: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.like.create({
        data: {
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
    }),

  removeLike: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.like.delete({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
      });
    }),

  bookmark: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.bookmark.create({
        data: {
          postId: input.postId,
          userId: ctx.session.user.id,
        },
      });
    }),

  removeBookmark: protectedProcedure
    .input(z.object({ postId: z.string().cuid() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.bookmark.delete({
        where: {
          userId_postId: {
            postId: input.postId,
            userId: ctx.session.user.id,
          },
        },
      });
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
        content: z
          .string({ required_error: "comment is required" })
          .min(3, "comment must be at least 3 characters")
          .max(2048, "comment must be at most 2048 characters"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.comment.create({
        data: {
          content: input.content,
          userId: ctx.session.user.id,
          postId: input.postId,
        },
      });
    }),

  comments: publicProcedure
    .input(
      z.object({
        postId: z.string().cuid(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const comments = await ctx.prisma.comment.findMany({
        take: limit + 1,
        where: {
          postId: input.postId,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (comments.length > limit) {
        const nextItem = comments.pop();
        nextCursor = nextItem!.id;
      }

      return {
        comments,
        nextCursor,
      };
    }),
});
