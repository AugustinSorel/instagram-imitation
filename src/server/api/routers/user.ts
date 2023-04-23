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
});
