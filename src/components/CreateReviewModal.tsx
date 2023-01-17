import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { HiChevronRight, HiPlusSm, HiX } from "react-icons/hi";

const CreateReviewModal = ({
  reviewModal,
  setReviewModal,
}: {
  reviewModal: boolean;
  setReviewModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewTextCount, setReviewCountText] = useState(0);

  return (
    <div
      className={`modal modal-bottom py-10 sm:modal-middle ${
        reviewModal && "modal-open"
      }`}
    >
      <div className="modal-box my-10 flex min-h-full flex-col border">
        <div className="flex items-start justify-between ">
          <h1 className="mb-4 text-2xl font-bold">Review `album name`</h1>
          <button
            title={reviewTextCount > 0 ? "Save and close" : "Close"}
            onClick={() => {
              if (reviewTextCount > 0) {
                confirm(
                  "Are you sure you want to do close this window, the text will be saved?"
                );
              }
              setReviewModal((prev) => !prev);
            }}
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
        <textarea
          className="textarea-bordered textarea flex-1 bg-slate-200 text-black"
          placeholder="Compose review..."
          value={reviewText}
          onChange={(e) => {
            setReviewText(e.target.value);
            setReviewCountText(e.target.value.length);
          }}
          maxLength={4000}
        />
        <label className="label">
          <span className="label-text-alt">{`${reviewTextCount}/4000`}</span>
        </label>
        <div className="modal-action justify-between">
          <button
            className="font-bold"
            onClick={() => {
              confirm("Are you sure you want to do wipe your review?");
              setReviewText("");
              setReviewCountText(0);
            }}
          >
            Reset
          </button>
          <button className="btn bg-green-500 font-bold text-white">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReviewModal;
