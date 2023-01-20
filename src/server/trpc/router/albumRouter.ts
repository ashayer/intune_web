import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const albumRouter = router({
  likeAlbum: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        albumId: z.string(),
        albumImage: z.string().nullish(),
        userImage: z.string(),
        username: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userLike = await ctx.prisma.userAlbumLikes.findFirst({
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

      if (userLike !== null) {
        await ctx.prisma.userAlbumLikes.delete({
          where: {
            id: userLike.id,
          },
        });
        return false;
      } else {
        await ctx.prisma.userAlbumLikes.create({
          data: {
            albumId: input.albumId,
            userId: input.userId,
            isLike: true,
            albumImage: input.albumImage,
            userImage: input.userImage,
            username: input.username,
          },
        });

        return true;
      }
    }),
  checkAlbumLike: publicProcedure
    .input(z.object({ userId: z.string(), albumId: z.string() }))
    .query(async ({ input, ctx }) => {
      const userLike = await ctx.prisma.userAlbumLikes.findFirst({
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

      if (userLike !== null) return userLike.isLike;

      return false;
    }),
  createAlbumRating: publicProcedure
    .input(
      z.object({ userId: z.string(), albumId: z.string(), rating: z.number() })
    )
    .query(async ({ input, ctx }) => {
      await ctx.prisma.userAlbumRatings.create({
        data: {
          ...input,
        },
      });

      return null;
    }),
  deleteRating: publicProcedure
    .input(
      z.object({ userId: z.string(), albumId: z.string(), rating: z.number() })
    )
    .query(async ({ input, ctx }) => {
      const userRating = await ctx.prisma.userAlbumRatings.findFirst({
        where: {
          AND: [{ userId: input.userId }, { albumId: input.albumId }],
        },
        select: {
          id: true,
          albumId: true,
          rating: true,
        },
      });

      if (userRating !== null) {
        await ctx.prisma.userAlbumRatings.delete({
          where: {
            id: userRating.id,
          },
        });
      }

      return null;
    }),
  updateRating: publicProcedure
    .input(
      z.object({ userId: z.string(), albumId: z.string(), rating: z.number() })
    )
    .query(async ({ input, ctx }) => {
      const userRating = await ctx.prisma.userAlbumRatings.findFirst({
        where: {
          AND: [{ userId: input.userId }, { albumId: input.albumId }],
        },
        select: {
          id: true,
          albumId: true,
          rating: true,
        },
      });

      if (userRating !== null) {
        await ctx.prisma.userAlbumRatings.update({
          where: {
            id: userRating.id,
          },
          data: {
            rating: input.rating,
          },
        });
      }

      return null;
    }),
  getAlbumReviewsById: publicProcedure
    .input(
      z.object({
        albumId: z.string(),
        skip: z.number().nullish(),
        sortBy: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.sortBy === "recent") {
        const albums = await ctx.prisma.albumReviews.findMany({
          take: 16,
          skip: input.skip || 0,
          where: {
            albumId: {
              equals: input.albumId,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        if (albums.length > 0) {
          return albums;
        }
        return null;
      } else {
        const albums = await ctx.prisma.albumReviews.findMany({
          take: 16,
          skip: input.skip || 0,
          where: {
            albumId: {
              equals: input.albumId,
            },
          },
          orderBy: {
            likes: "desc",
          },
        });
        if (albums.length > 0) {
          return albums;
        }
        return null;
      }
    }),
  getAlbumStats: publicProcedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input, ctx }) => {
      const albumsReviewCount = await ctx.prisma.albumReviews.count({
        where: {
          albumId: {
            equals: input.albumId,
          },
        },
      });

      const albumsRatingCount = await ctx.prisma.userAlbumRatings.count({
        where: {
          albumId: {
            equals: input.albumId,
          },
        },
      });

      const albumsLikeCount = await ctx.prisma.userAlbumLikes.count({
        where: {
          albumId: {
            equals: input.albumId,
          },
        },
      });

      const albumAverageRating = await ctx.prisma.userAlbumRatings.aggregate({
        where: {
          albumId: {
            equals: input.albumId,
          },
        },
        _avg: {
          rating: true,
        },
      });

      const albumStatsObject = {
        albumsReviewCount,
        albumsRatingCount,
        albumsLikeCount,
        albumAverageRating,
      };

      return albumStatsObject;
    }),
});
