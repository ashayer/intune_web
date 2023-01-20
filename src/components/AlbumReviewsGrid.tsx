import type { AlbumReviews } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { HiChevronRight, HiPencil, HiPlusSm } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import AlbumReview from "./AlbumReview";
import CreateReviewModal from "./CreateReviewModal";
import { NoUserModal } from "./NoUserModal";

const AlbumReviewsGrid = ({
  albumReviews,
  albumId,
}: {
  albumReviews: AlbumReviews[] | null | undefined;
  albumId: string;
}) => {
  const [reviewModal, setReviewModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createOrUpdate, setCreateOrUpdate] = useState("create");
  const [getReviewText, setGetReviewText] = useState("");
  const { data: session, status } = useSession();

  const getYourAlbumReivewQuery = trpc.review.getYourAlbumReview.useQuery(
    {
      userId: session?.user?.id as string,
      albumId: albumId,
    },
    {
      enabled: status === "authenticated",
      onSuccess: (data) => {
        if (data) {
          setCreateOrUpdate("update");
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="my-10 flex flex-col">
      <NoUserModal showModal={showModal} setShowModal={setShowModal} />

      <button
        onClick={() => {
          if (status === "unauthenticated") {
            setShowModal((prev) => !prev);
          } else {
            setReviewModal((prev) => !prev);
          }
        }}
        className="btn-circle btn fixed bottom-0 left-1/2 mb-4 -translate-x-1/2 rounded-full border-2 bg-green-600  md:hidden"
      >
        <HiPlusSm className="h-10 w-10 text-white" />
      </button>
      <CreateReviewModal
        reviewModal={reviewModal}
        setReviewModal={setReviewModal}
        albumId={albumId as string}
      />
      <div className="mx-auto mt-10 flex w-full flex-col items-end justify-between gap-y-4 md:flex-row">
        <div>
          {/* <select className="select-bordered select select-sm mr-4">

            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <select className="select-bordered select select-sm">
            <option>Han Solo</option>
            <option>Greedo</option>
          </select> */}
        </div>
        {createOrUpdate === "create" ? (
          <button
            onClick={() => {
              if (status === "unauthenticated") {
                setShowModal((prev) => !prev);
              } else {
                setReviewModal((prev) => !prev);
              }
            }}
            className="bg-green-6 00 invisible flex items-center rounded-xl bg-green-600 py-1 pr-4 pl-3 font-bold text-white md:visible"
          >
            <HiPlusSm className="h-6 w-6 text-white" /> Review
          </button>
        ) : (
          <button
            onClick={() => {
              if (status === "unauthenticated") {
                setShowModal((prev) => !prev);
              } else {
                setReviewModal((prev) => !prev);
              }
            }}
            className="bg-green-6 00 invisible flex items-center rounded-xl bg-blue-600 py-1 pr-4 pl-3 font-bold text-white md:visible"
          >
            <HiPencil className="mr-2 h-4 w-4 text-white" />
            Edit your review
          </button>
        )}
      </div>
      <div className="flex flex-[0.75] flex-col gap-y-2">
        {albumReviews ? (
          albumReviews.map((review, index) => (
            <div key={index}>
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
