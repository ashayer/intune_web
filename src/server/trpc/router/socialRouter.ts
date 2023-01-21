import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const socialRouter = router({
  followUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userToFollowId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userIsFollowing = await ctx.prisma.followersList.findFirst({
        where: {
          AND: [
            { userId: input.userId },
            { followingUserId: input.userToFollowId },
          ],
        },
        select: {
          id: true,
          followingUserId: true,
          isFollowing: true,
        },
      });

      if (userIsFollowing !== null) {
        await ctx.prisma.followersList.delete({
          where: {
            id: userIsFollowing.id,
          },
        });
      } else {
        await ctx.prisma.followersList.create({
          data: {
            userId: input.userId,
            followingUserId: input.userToFollowId,
            isFollowing: true,
          },
        });
      }
      return null;
    }),
  checkUserFollow: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userToFollowId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userIsFollowing = await ctx.prisma.followersList.findFirst({
        where: {
          AND: [
            { userId: input.userId },
            { followingUserId: input.userToFollowId },
          ],
        },
        select: {
          id: true,
          isFollowing: true,
        },
      });

      if (userIsFollowing !== null) return userIsFollowing.isFollowing;
      return false;
    }),
  getFollowingReviews: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const followingList = await ctx.prisma.followersList.findMany({
        where: {
          userId: input.userId,
        },
      });

      const allReviews = await ctx.prisma.albumReviews.findMany({
        where: {
          user: {
            id: {
              in: [...followingList.map((row) => row.followingUserId)],
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      });

      return allReviews;
    }),
  getUserInfo: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        skip: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userInfo = ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
        include: {
          AlbumReviews: {
            select: {
              id: true,
              albumId: true,
              text: true,
              likes: true,
              albumImage: true,
              albumName: true,
              userImage: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 6,
            skip: input.skip || 0,
          },
          UserAlbumLikes: {
            select: {
              id: true,
              albumId: true,
              albumImage: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 6,
            skip: input.skip || 0,
          },
          UserAlbumRatings: {
            select: {
              id: true,
              albumId: true,
              rating: true,
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 6,
            skip: input.skip || 0,
          },
        },
      });
      return userInfo;
    }),
  getFollowInfo: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        skip: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userIsFollowingCount = await ctx.prisma.followersList.count({
        where: {
          userId: input.userId,
        },
      });

      const userFollowersCount = await ctx.prisma.followersList.count({
        where: {
          followingUserId: input.userId,
        },
      });

      return {
        userFollowersCount,
        userIsFollowingCount,
      };
    }),
  getFollowersList: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        skip: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const followersList = await ctx.prisma.followersList.findMany({
        where: {
          followingUserId: input.userId,
        },
        select: {
          userId: true,
        },
      });

      return followersList;
    }),
  getFollowingList: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        skip: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const followingList = await ctx.prisma.followersList.findMany({
        where: {
          userId: input.userId,
        },
      });

      return followingList;
    }),
  getBasicInfo: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const userInfo = await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
        select: {
          name: true,
          image: true,
        },
      });
      return userInfo;
    }),
});
