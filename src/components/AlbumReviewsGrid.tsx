import type { AlbumReviews } from "@prisma/client";
import { useSession } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { HiChevronRight, HiPencil, HiPlusSm } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import AlbumReview from "./AlbumReview";
import CreateReviewModal from "./CreateReviewModal";
import { NoUserModal } from "./NoUserModal";

const AlbumReviewsGrid = ({
  albumReviews,
}: {
  albumReviews: AlbumReviews[] | null | undefined;
}) => {
  return (
    <div className="my-10 flex flex-col">
      <div className="flex flex-[0.75] flex-col gap-y-2">
        {albumReviews ? (
          albumReviews.map((review, index) => (
            <div key={review.id}>
              <AlbumReview review={review} />
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-xl font-bold">
            Be the first to leave a review!
          </div>
        )}
      </div>
    </div>
  );
};

export default AlbumReviewsGrid;
