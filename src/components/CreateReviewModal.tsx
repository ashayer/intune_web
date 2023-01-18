import { useSession } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { HiChevronRight, HiPlusSm, HiX } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import { NoUserModal } from "./NoUserModal";

const CreateReviewModal = ({
  reviewModal,
  setReviewModal,
  albumId,
}: {
  reviewModal: boolean;
  setReviewModal: Dispatch<SetStateAction<boolean>>;
  albumId: string;
}) => {
  const [reviewText, setReviewText] = useState("");
  const [reviewTextCount, setReviewCountText] = useState(0);

  const { data: session } = useSession();

  const createReviewMutate = trpc.review.createAlbumReview.useMutation({
    onSuccess: () => setReviewModal(false),
  });

  return (
    <>
      <div
        className={`modal modal-bottom py-10 sm:modal-middle ${
          reviewModal && "modal-open"
        }`}
      >
        <div className="modal-box my-10 flex min-h-full flex-col border">
          <div className="flex items-end justify-end p-2">
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
            <button
              className="btn bg-green-500 font-bold text-white"
              onClick={() => {
                if (reviewText.length > 0) {
                  createReviewMutate.mutate({
                    userId: session?.user?.id as string,
                    username: session?.user?.name as string,
                    albumId: albumId,
                    text: reviewText,
                  });
                }
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReviewModal;
