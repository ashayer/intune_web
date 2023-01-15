import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const albumRouter = router({
  followUser: publicProcedure
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
      });

      return allReviews;
    }),
});
