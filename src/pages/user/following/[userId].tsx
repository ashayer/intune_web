import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { trpc } from "../../../utils/trpc";
import {
  HiChevronLeft,
  HiChevronRight,
  HiDocumentText,
  HiHeart,
  HiStar,
} from "react-icons/hi";
import loadingGif from "../../../assets/loading.gif";
import UserSocialInfo from "../../../components/UserSocialInfo";

const UserDetails: NextPage = () => {
  const nrouter = useRouter();
  const { userId } = nrouter.query;
  const getBasicInfo = trpc.social.getBasicInfo.useQuery(
    {
      userId: userId as string,
    },
    { enabled: userId !== undefined }
  );

  const followingList = trpc.social.getFollowingList.useQuery(
    {
      userId: userId as string,
    },
    { enabled: userId !== undefined }
  );

  return getBasicInfo.isLoading && !getBasicInfo.isSuccess ? (
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
              src={getBasicInfo.data?.image as string}
              alt="User Profile"
              width={96}
              height={96}
              className="m-4 rounded-full"
            />
          </div>
          <a
            className="cursor-pointer text-xl font-bold hover:text-slate-700"
            onClick={() => Router.push(`/user/${userId}`)}
          >
            {getBasicInfo.data?.name}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 px-4">
        <p className="w-full text-center text-xl font-bold text-slate-300">
          Following
        </p>
      </div>
      <div className="mx-auto flex flex-col gap-y-4 px-6">
        {followingList.data &&
          followingList.data.map((user) => (
            <div key={user.id}>
              <UserSocialInfo userId={user.followingUserId} />
            </div>
          ))}
      </div>
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
