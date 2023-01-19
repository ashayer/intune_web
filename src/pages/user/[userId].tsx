import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { loadImage, analyzeImage, rgbToHex } from "../../assets/colorPicker";
import { HiDocumentText, HiHeart, HiStar } from "react-icons/hi";

const UserDetails: NextPage = () => {
  const { data: session } = useSession();

  const [bgColor, setBgColor] = useState("");

  const nrouter = useRouter();

  const { userId } = nrouter.query;

  const userInfo = trpc.social.getUserInfo.useQuery({
    userId: session?.user?.id as string,
  });

  return (
    <div
      style={{
        background: bgColor,
      }}
      className="border"
    >
      <div className="mx-auto max-w-7xl border">
        <div className="flex flex-col items-center border p-4 md:flex-row">
          <div className="flex flex-1 items-center p-4">
            <Image
              src={session?.user?.image as string}
              alt="User Profile"
              width={96}
              height={96}
              className="m-4 rounded-full"
            />
            <p className="text-xl font-bold">{session?.user?.name}</p>
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
        </div>
        <div>
          {userInfo.data?.AlbumReviews.map((review, index) => (
            <div key={index}>
              <div className="flex border-b border-zinc-800 pb-2">
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
                    className=" overflow-hidden text-ellipsis text-sm text-slate-400"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {review.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
