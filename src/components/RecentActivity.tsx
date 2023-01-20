import Router from "next/router";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import { useSession } from "next-auth/react";
const RecentActivity = () => {
  const { data: session, status } = useSession();

  const getSocialActicity = trpc.social.getFollowingReviews.useQuery({
    userId: session?.user?.id as string,
  });

  return (
    <div className="w-full">
      {getSocialActicity.data && (
        <div>
          <p className="p-6 text-3xl font-bold">recent activity</p>
          <div className="flex flex-col gap-y-2 px-4">
            {getSocialActicity.data.map((review) => (
              <div className="flex flex-row" key={review.id}>
                <div className="flex flex-[0.10] items-center text-center">
                  <div className="flex w-16 flex-col items-center justify-center">
                    <button
                      className="h-full transition-all hover:scale-95"
                      onClick={() => Router.push(`/user/${review.userId}`)}
                    >
                      <Image
                        title={review.username}
                        src={review.userImage}
                        alt="album cover"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </button>
                    <p className="text-sm">{review.username}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center">
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
                  </div>
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
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
