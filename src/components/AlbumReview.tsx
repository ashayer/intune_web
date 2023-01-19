import type { AlbumReviews } from "@prisma/client";
import Image from "next/image";
import { HiOutlineHeart } from "react-icons/hi";

const AlbumReview = ({ review }: { review: AlbumReviews }) => {
  return (
    <div className="flex">
      <div className="mx-2 flex flex-col items-center gap-y-2">
        <Image
          src="https://randomuser.me/api/portraits/women/94.jpg"
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
      <div className="flex flex-col">
        <div className="flex">
          <p className="text-xs font-semibold text-slate-300">
            {review?.username}
          </p>
        </div>
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
  );
};

export default AlbumReview;
