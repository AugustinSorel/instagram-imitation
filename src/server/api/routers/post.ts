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
        include: { user: true },
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
