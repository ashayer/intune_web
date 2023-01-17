import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const reviewRouter = router({
  createAlbumReview: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        username: z.string(),
        albumId: z.string(),
        text: z.string().min(1).max(4000),
      })
    )
    .query(async ({ input, ctx }) => {
      await ctx.prisma.albumReviews.create({
        data: {
          ...input,
        },
      });

      return null;
    }),
  updateAlbumReview: publicProcedure
    .input(
      z.object({ userId: z.string(), albumId: z.string(), text: z.string() })
    )
    .query(async ({ input, ctx }) => {
      const userLike = await ctx.prisma.albumReviews.findFirst({
        where: {
          AND: [{ userId: input.userId }, { albumId: input.albumId }],
        },
        select: {
          id: true,
        },
      });

      if (userLike !== null) {
        await ctx.prisma.albumReviews.update({
          where: {
            id: userLike.id,
          },
          data: {
            text: input.text,
          },
        });
      }

      return null;
    }),
  likeAlbumReview: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        albumId: z.string(),
        reviewId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userReviewLike = await ctx.prisma.reviewLikes.findFirst({
        where: {
          AND: [
            { userId: input.userId },
            { albumId: input.albumId },
            { isLike: true },
          ],
        },
        select: {
          id: true,
          albumId: true,
          isLike: true,
        },
      });
      if (userReviewLike !== null) {
        await ctx.prisma.reviewLikes.delete({
          where: {
            id: userReviewLike.id,
          },
        });
      } else {
        await ctx.prisma.reviewLikes.create({
          data: {
            ...input,
            isLike: true,
          },
        });
      }
      return null;
    }),
  checkAlbumReviewLike: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        albumId: z.string(),
        reviewId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userReviewLike = await ctx.prisma.reviewLikes.findFirst({
        where: {
          AND: [
            { userId: input.userId },
            { albumId: input.albumId },
            { isLike: true },
          ],
        },
        select: {
          id: true,
          albumId: true,
          isLike: true,
        },
      });
      if (userReviewLike !== null) return userReviewLike.isLike;
      return false;
    }),
});
