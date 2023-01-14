import { router } from "../trpc";
import { searchRouter } from "./searchRouter";

export const appRouter = router({
  search: searchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
