import type { AlbumReviews } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import { NoUserModal } from "./NoUserModal";

const AlbumReview = ({ review }: { review: AlbumReviews }) => {
  const [expandText, setExpandText] = useState(false);
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const likeReviewQuery = trpc.review.likeAlbumReview.useMutation({
    onError: () => {
      setShowModal(true);
    },
    onSuccess: (data) => {
      checkIfReviewLikes.refetch();
      getReviewLikesTotal.refetch();
    },
  });

  const checkIfReviewLikes = trpc.review.checkAlbumReviewLike.useQuery(
    {
      reviewId: review.id,
      userId: session?.user?.id as string,
      albumId: review.albumId,
    },
    {
      onSuccess: (data) => setIsLiked(data),
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );

  const getReviewLikesTotal = trpc.review.checkReviewLikes.useQuery({
    reviewId: review.id,
  });

  return (
    <div className="flex border-b border-zinc-800 pb-2">
      <NoUserModal showModal={showModal} setShowModal={setShowModal} />
      <div className="mx-2 flex flex-col items-center gap-y-2">
        <Image
          src={review.userImage}
          alt="user"
          height={50}
          width={50}
          className="w-8 rounded-full"
        />
        <button
          onClick={() => {
            likeReviewQuery.mutate({
              userId: session?.user?.id as string,
              albumId: review.albumId,
              reviewId: review.id,
            });
          }}
        >
          {isLiked ? (
            <HiHeart className="h-8 w-8 text-red-600" />
          ) : (
            <HiOutlineHeart className="h-8 w-8" />
          )}
        </button>
        <p className="text-xs" title={`${review.likes} total likes`}>
          {getReviewLikesTotal.data?.likes}
        </p>
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex ">
          <p className="text-xs font-semibold text-slate-300">
            {review?.username}
          </p>
        </div>
        <p
          className=" cursor-pointer overflow-hidden text-ellipsis text-sm text-slate-400"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: expandText ? 100 : 3,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-all",
          }}
          onClick={() => setExpandText((prev) => true)}
        >
          {review.text}
        </p>
        <div className="w-full text-right">
          <p className="w-full text-sm text-slate-400">
            {review.createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumReview;
