import type { AlbumReviews } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";

const AlbumReview = ({ review }: { review: AlbumReviews }) => {
  const [expandText, setExpandText] = useState(false);

  return (
    <div className="flex border-b border-zinc-800 pb-2">
      <div className="mx-2 flex flex-col items-center gap-y-2">
        <Image
          src={review.userImage}
          alt="user"
          height={50}
          width={50}
          className="w-8 rounded-full"
        />
        <button className="hover:text-red-100">
          <HiOutlineHeart className="h-6 w-6 " />
        </button>
        <p className="text-xs" title={`${review.likes} total likes`}>
          {review.likes}
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
