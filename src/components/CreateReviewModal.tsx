import { useSession } from "next-auth/react";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { HiX } from "react-icons/hi";
import { trpc } from "../utils/trpc";

const CreateReviewModal = ({
  reviewModal,
  setReviewModal,
  albumId,
  albumReviewsQuery,
}: {
  reviewModal: boolean;
  setReviewModal: Dispatch<SetStateAction<boolean>>;
  albumId: string;
  albumReviewsQuery: any;
}) => {
  const [reviewText, setReviewText] = useState("");

  const [reviewTextCount, setReviewCountText] = useState(0);

  const [createOrUpdate, setCreateOrUpdate] = useState("create");

  const { data: session, status } = useSession();

  const createReviewMutate = trpc.review.createAlbumReview.useMutation({
    onSuccess: () => {
      setReviewModal(false);
      albumReviewsQuery.refetch();
      getYourAlbumReviewQuery.refetch();
    },
  });

  const updateReviewMutate = trpc.review.updateAlbumReview.useMutation({
    onSuccess: () => {
      setReviewModal(false);
      albumReviewsQuery.refetch();
      getYourAlbumReviewQuery.refetch();
    },
  });

  const getYourAlbumReviewQuery = trpc.review.getYourAlbumReview.useQuery(
    {
      userId: session?.user?.id as string,
      albumId: albumId,
    },
    {
      enabled: status === "authenticated",
      onSuccess: (data) => {
        if (data) {
          setCreateOrUpdate("update");
          setReviewText(data.text);
          setReviewCountText(data.text.length);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const deleteReview = trpc.review.deleteReview.useMutation({
    onSuccess: () => {
      albumReviewsQuery.refetch();
      getYourAlbumReviewQuery.refetch();
      setReviewModal(false);
    },
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
                  confirm("Are you sure you want to close this window?");
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
              className="btn-sm btn font-bold"
              onClick={() => {
                confirm("Are you sure you want to do wipe your review?");
                setReviewText("");
                setReviewCountText(0);
              }}
            >
              Reset
            </button>
            {createOrUpdate === "create" ? (
              <button
                className={`btn-sm btn bg-green-500 font-bold text-white ${
                  createReviewMutate.isLoading && "loading"
                }`}
                onClick={() => {
                  if (reviewText.length > 0) {
                    createReviewMutate.mutate({
                      userId: session?.user?.id as string,
                      username: session?.user?.name as string,
                      albumId: albumId,
                      text: reviewText,
                      userImage: session?.user?.image as string,
                    });
                  }
                }}
              >
                Post
              </button>
            ) : (
              <>
                <button
                  className={`btn-sm btn bg-red-500 font-bold text-white ${
                    deleteReview.isLoading && "loading"
                  }`}
                  onClick={() => {
                    if (reviewText.length > 0) {
                      deleteReview.mutate({
                        reviewId: getYourAlbumReviewQuery.data?.id as string,
                      });
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className={`btn-sm btn bg-blue-500 font-bold text-white ${
                    updateReviewMutate.isLoading && "loading"
                  }`}
                  onClick={() => {
                    if (reviewText.length > 0) {
                      updateReviewMutate.mutate({
                        userId: session?.user?.id as string,
                        albumId: albumId,
                        text: reviewText,
                      });
                    }
                  }}
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReviewModal;
