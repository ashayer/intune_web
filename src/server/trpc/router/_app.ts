import { router } from "../trpc";
import { albumRouter } from "./albumRouter";
import { reviewRouter } from "./reviewRouter";
import { searchRouter } from "./searchRouter";
import { socialRouter } from "./socialRouter";

export const appRouter = router({
  search: searchRouter,
  album: albumRouter,
  review: reviewRouter,
  social: socialRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
