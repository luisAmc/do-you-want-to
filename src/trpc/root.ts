import { eventRouter } from "./routers/event";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  event: eventRouter,
});

export type AppRouter = typeof appRouter;
