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
        userImage: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!input.userId) throw new Error("Not signed in");

      await ctx.prisma.albumReviews.create({
        data: {
          ...input,
        },
      });

      return null;
    }),
  deleteReview: publicProcedure
    .input(
      z.object({
        reviewId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.albumReviews.delete({
        where: {
          id: input.reviewId,
        },
      });

      return null;
    }),
  getYourAlbumReview: publicProcedure
    .input(z.object({ userId: z.string(), albumId: z.string() }))
    .query(async ({ input, ctx }) => {
      const albumReview = await ctx.prisma.albumReviews.findFirst({
        where: {
          AND: [{ userId: input.userId }, { albumId: input.albumId }],
        },
        select: {
          id: true,
          text: true,
        },
      });

      if (albumReview !== null) {
        return albumReview;
      }

      return null;
    }),
  updateAlbumReview: publicProcedure
    .input(
      z.object({ userId: z.string(), albumId: z.string(), text: z.string() })
    )
    .mutation(async ({ input, ctx }) => {
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
    .mutation(async ({ input, ctx }) => {
      const userReviewLike = await ctx.prisma.reviewLikes.findFirst({
        where: {
          AND: [
            { userId: input.userId },
            { albumId: input.albumId },
            { reviewId: input.reviewId },
          ],
        },
        select: {
          id: true,
        },
      });

      console.log(userReviewLike);

      if (userReviewLike !== null) {
        await ctx.prisma.reviewLikes.delete({
          where: {
            id: userReviewLike.id,
          },
        });

        await ctx.prisma.albumReviews.update({
          where: {
            id: input.reviewId,
          },
          data: {
            likes: {
              decrement: 1,
            },
          },
        });
        return false;
      } else {
        await ctx.prisma.reviewLikes.create({
          data: {
            userId: input.userId,
            albumId: input.albumId,
            reviewId: input.reviewId,
            isLike: true,
          },
        });

        await ctx.prisma.albumReviews.update({
          where: {
            id: input.reviewId,
          },
          data: {
            likes: {
              increment: 1,
            },
          },
        });
        return true;
      }
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
            { reviewId: input.reviewId },
          ],
        },
        select: {
          id: true,
          albumId: true,
          isLike: true,
        },
      });
      if (userReviewLike !== null) return true;
      return false;
    }),
});
