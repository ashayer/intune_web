import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentText,
  HiHeart,
  HiStar,
} from "react-icons/hi";
import loadingGif from "../../assets/loading.gif";

const UserDetails: NextPage = () => {
  const { data: session, status } = useSession();

  const nrouter = useRouter();

  const [isFollowing, setIsFollowing] = useState(false);

  const { userId } = nrouter.query;
  const [skip, setSkip] = useState(0);

  const userInfo = trpc.social.getUserInfo.useQuery(
    {
      userId: userId as string,
      skip: skip,
    },
    { enabled: userId !== undefined }
  );

  const followInfo = trpc.social.getFollowInfo.useQuery(
    {
      userId: userId as string,
    },
    { enabled: userId !== undefined }
  );

  const checkIfFollow = trpc.social.checkUserFollow.useQuery(
    {
      userToFollowId: userId as string,
      userId: session?.user?.id as string,
    },
    {
      onSuccess: (data) => setIsFollowing(data),
      enabled: status === "authenticated" && userId !== undefined,
    }
  );

  const followUser = trpc.social.followUser.useMutation({
    onSuccess: () => {
      checkIfFollow.refetch();
      followInfo.refetch();
    },
  });

  return userInfo.isLoading && !userInfo.isSuccess ? (
    <div className="flex h-screen items-center justify-center">
      <div className="h-24 w-24 animate-pulse">
        <Image src={loadingGif} alt="" />
      </div>
    </div>
  ) : (
    <div className="mx-auto min-h-screen max-w-7xl">
      <div className="flex flex-col items-center p-4 md:flex-row">
        <div className="flex flex-1 items-center p-4">
          <div className="flex  px-4">
            <Image
              src={userInfo.data?.image as string}
              alt="User Profile"
              width={96}
              height={96}
              className="m-4 rounded-full"
            />
          </div>
          <p className="text-xl font-bold">{userInfo.data?.name}</p>
        </div>
        <div className="flex gap-x-4">
          <div className="flex flex-col text-center">
            <a
              className="cursor-pointer font-bold text-slate-400 hover:text-blue-500"
              onClick={() => Router.push(`/user/following/${userId}`)}
            >
              Following
            </a>
            <p>{followInfo.data?.userIsFollowingCount}</p>
          </div>
          <div className="flex flex-col text-center">
            <a
              className="cursor-pointer font-bold text-slate-400 hover:text-blue-500"
              onClick={() => Router.push(`/user/followers/${userId}`)}
            >
              Followers
            </a>
            <p>{followInfo.data?.userFollowersCount}</p>
          </div>
        </div>
        <div className="flex w-full justify-evenly text-center md:w-1/4">
          <div>
            <HiHeart className="h-8 w-8 text-red-500" />
            <p> {userInfo.data?.UserAlbumLikes.length}</p>
          </div>
          <div>
            <HiStar className="h-8 w-8 text-yellow-500" />
            <p> {userInfo.data?.UserAlbumRatings.length}</p>
          </div>
          <div>
            <HiDocumentText className="h-8 w-8 text-red-500" />
            <p>{userInfo.data?.AlbumReviews.length}</p>
          </div>
        </div>
        {userId !== session?.user?.id && status === "authenticated" && (
          <button
            className={`btn-sm btn my-10 text-white ${
              followUser.isLoading && "loading"
            } ${isFollowing ? "bg-red-500" : "bg-green-500"}`}
            onClick={() => {
              followUser.mutate({
                userId: session?.user?.id as string,
                userToFollowId: userId as string,
              });
            }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>
      <div className="flex flex-col gap-y-2 px-4">
        <p className="w-full text-center text-xl font-bold text-slate-300">
          Reviews
        </p>
        {userInfo.data?.AlbumReviews.slice(0, 5).map((review) => (
          <div className="flex flex-row" key={review.id}>
            <div className="flex flex-[0.15] flex-col items-center text-center">
              <button
                className="h-full transition-all hover:scale-95"
                onClick={() => Router.push(`/album/${review.albumId}`)}
              >
                <Image
                  title={review.albumName}
                  src={review.albumImage}
                  alt="album cover"
                  width={64}
                  height={64}
                  className="rounded-xl"
                />
              </button>
              <p className="text-sm">{review.albumName}</p>
              {userInfo.data?.UserAlbumLikes.some(
                (likes) => likes.albumId === review.albumId
              ) && <HiHeart className="h-8 w-8 text-red-500" />}
              {userInfo.data?.UserAlbumRatings.some(
                (rating) => rating.albumId === review.albumId
              ) && <p>stars here</p>}
            </div>
            <div className="ml-4 flex-[0.75]">
              <p
                className="cursor w-full overflow-hidden text-ellipsis text-sm text-slate-400"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  wordBreak: "break-all",
                }}
              >
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </div>
      {userInfo.data && (
        <div className="flex justify-between py-4">
          <button
            className="btn"
            disabled={skip === 0}
            onClick={() => {
              setSkip((prev) => prev - 5);
              userInfo.refetch();
            }}
          >
            <HiChevronLeft className="h-6 w-6" />
            Newer
          </button>
          <button
            className="btn"
            disabled={userInfo.data?.AlbumReviews.length <= 5}
            onClick={() => {
              setSkip((prev) => prev + 5);
              userInfo.refetch();
            }}
          >
            Older
            <HiChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

{
  /* <div className="flex border-b border-zinc-800 pb-2">
                <div className="mx-2 flex flex-col items-center gap-y-2">
                  <Image
                    src={session?.user?.image as string}
                    alt="user"
                    height={50}
                    width={50}
                    className="w-8 rounded-full"
                  />
                  {userInfo.data?.UserAlbumLikes.some(
                    (likes) => likes.albumId === review.albumId
                  ) && <HiHeart className="h-8 w-8 text-red-500" />}
                  {userInfo.data?.UserAlbumRatings.some(
                    (rating) => rating.albumId === review.albumId
                  ) && <p>stars here</p>}
                </div>
                <div className="flex flex-col">
                  <p
                    className=" cursor-pointer overflow-hidden text-ellipsis text-sm text-slate-400"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      wordBreak: "break-all",
                    }}
                  >
                    {review.text}
                  </p>
                </div>
              </div> */
}
