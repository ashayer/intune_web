import { useState } from "react";
import { HiChevronRight, HiPlusSm, HiX } from "react-icons/hi";
import AlbumReview from "./AlbumReview";
import CreateReviewModal from "./CreateReviewModal";

const AlbumReviewsGrid = () => {
  const [reviewModal, setReviewModal] = useState(true);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          setReviewModal((prev) => !prev);
        }}
        className="btn-ghost btn-circle btn fixed bottom-0 left-1/2 mb-4 -translate-x-1/2 rounded-full border-2 bg-green-400 bg-slate-200 md:hidden"
      >
        <HiPlusSm className="h-10 w-10 text-white" />
      </button>
      <CreateReviewModal
        reviewModal={reviewModal}
        setReviewModal={setReviewModal}
      />
      <div className="mx-auto mt-10 flex w-full flex-col items-end justify-between gap-y-4 md:flex-row">
        <div>
          <select className="select-bordered select select-sm mr-4">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
          <select className="select-bordered select select-sm">
            <option disabled selected>
              Who shot first?
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
        <button
          onClick={() => {
            setReviewModal((prev) => !prev);
          }}
          className="invisible flex items-center rounded-xl bg-green-400 py-1 pr-4 pl-3 font-bold text-white md:visible"
        >
          <HiPlusSm className="h-6 w-6 text-white" /> Review
        </button>
      </div>
      <div className="flex flex-[0.75] flex-col">
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
      </div>
      <div className="py-4 text-end">
        <button className="btn">
          Older
          <HiChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default AlbumReviewsGrid;
