import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string().trim().min(1),
      })
    )
    .query(async ({ ctx: { db } }) => {}),
});
