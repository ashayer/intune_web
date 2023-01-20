import { type NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import AlbumInfoGrid from "../../components/AlbumInfoGrid";
import AlbumReviewsGrid from "../../components/AlbumReviewsGrid";
import * as NextImage from "next/image";
import loadingGif from "../../assets/loading.gif";
import TracklistGrid from "../../components/TracklistGrid";
import { useSession } from "next-auth/react";
import { loadImage, analyzeImage, rgbToHex } from "../../assets/colorPicker";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPencil,
  HiPlusSm,
} from "react-icons/hi";
import CreateReviewModal from "../../components/CreateReviewModal";
import { NoUserModal } from "../../components/NoUserModal";
const AlbumDetails: NextPage = () => {
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();
  const [tracklistInfo, setTracklistInfo] =
    useState<SpotifyApi.AlbumTracksResponse>();

  const [bgColor, setBgColor] = useState("black");
  const [skip, setSkip] = useState(0);
  const { data: session, status } = useSession();
  const [reviewModal, setReviewModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sortReviewsBy, setSortReviewsBy] = useState("recent");
  const [createOrUpdate, setCreateOrUpdate] = useState("create");

  const nrouter = useRouter();
  const { albumId } = nrouter.query;

  const getYourAlbumReivewQuery = trpc.review.getYourAlbumReview.useQuery(
    {
      userId: session?.user?.id as string,
      albumId: albumId as string,
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

  const albumInfoQuery = trpc.search.getAlbumInfoById.useQuery(
    {
      albumId: albumId as string,
    },
    {
      onSuccess: (data) => {
        setAlbumData(data);
        if (data.images && data.images[2]) {
          const imageComponent = loadImage(data.images[2].url as string);
          imageComponent.onload = function () {
            const palette = analyzeImage(imageComponent);
            if (palette && palette[0]) {
              setBgColor(rgbToHex(palette[0].r, palette[0].g, palette[0].b));
            }
          };
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const albumTracksQuery = trpc.search.getAlbumTracksById.useQuery(
    {
      albumId: albumId as string,
    },
    {
      onSuccess: (data) => setTracklistInfo(data),
      refetchOnWindowFocus: false,
    }
  );

  const albumReviewsQuery = trpc.album.getAlbumReviewsById.useQuery(
    {
      albumId: albumId as string,
      skip: skip,
      sortBy: sortReviewsBy,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div
      style={{
        background: bgColor,
      }}
      className="py-40"
    >
      <NoUserModal showModal={showModal} setShowModal={setShowModal} />

      <div
        className="mx-auto min-h-screen max-w-7xl"
        style={{
          backgroundColor: "#121212",
          boxShadow: "0 0 25px 75px #121212",
        }}
      >
        <main className="flex flex-col px-4 md:flex-row">
          <div className="flex-[0.25]">
            <p className="my-4 border-b border-zinc-700 pb-4 text-center font-bold">
              {albumData?.name}
            </p>
            {albumInfoQuery.isLoading && !albumInfoQuery.isSuccess ? (
              <div className="flex h-screen items-center justify-center">
                <div className="h-24 w-24 animate-pulse">
                  <NextImage.default src={loadingGif} alt="" />
                </div>
              </div>
            ) : (
              <AlbumInfoGrid
                albumData={albumData}
                albumId={albumId as string}
              />
            )}
          </div>
          <div className="flex-[0.75]">
            {albumTracksQuery.isLoading && !albumTracksQuery.isSuccess ? (
              <div className="flex items-center justify-center">
                <div className="h-24 w-24 animate-pulse">
                  <NextImage.default src={loadingGif} alt="" />
                </div>
              </div>
            ) : (
              <TracklistGrid
                tracklistInfo={tracklistInfo as SpotifyApi.AlbumTracksResponse}
              />
            )}

            {albumReviewsQuery.isLoading && !albumReviewsQuery.isSuccess ? (
              <div className="flex h-screen items-center justify-center">
                <div className="h-24 w-24 animate-pulse">
                  <NextImage.default src={loadingGif} alt="" />
                </div>
              </div>
            ) : (
              <div>
                <CreateReviewModal
                  reviewModal={reviewModal}
                  setReviewModal={setReviewModal}
                  albumId={albumId as string}
                />
                <div className="mx-auto mt-10 flex w-full flex-col items-end justify-end gap-y-4 md:flex-row">
                  <div className="flex gap-x-4">
                    <select
                      className="select-bordered select select-sm mr-4"
                      name="review-sort-select"
                      onChange={(e) => setSortReviewsBy(e.target.value)}
                      value={sortReviewsBy}
                    >
                      <option value="recent">Most recent</option>
                      <option value="liked">Most liked</option>
                    </select>
                  </div>
                  {createOrUpdate === "create" ? (
                    <>
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
                    </>
                  ) : (
                    <>
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
                      <button
                        onClick={() => {
                          if (status === "unauthenticated") {
                            setShowModal((prev) => !prev);
                          } else {
                            setReviewModal((prev) => !prev);
                          }
                        }}
                        className="btn-circle btn fixed bottom-0 left-1/2 mb-4 -translate-x-1/2 rounded-full border-2 bg-blue-600  md:hidden"
                      >
                        <HiPencil className="h-6 w-6 text-white" />
                      </button>
                    </>
                  )}
                </div>
                <AlbumReviewsGrid
                  albumReviews={albumReviewsQuery.data?.slice(0, 15)}
                />
              </div>
            )}
            {albumReviewsQuery.data && (
              <div className="flex justify-between py-4">
                <button
                  className="btn"
                  disabled={skip === 0}
                  onClick={() => {
                    setSkip((prev) => prev - 15);
                    albumReviewsQuery.refetch();
                  }}
                >
                  <HiChevronLeft className="h-6 w-6" />
                  Newer
                </button>
                <button
                  className="btn"
                  disabled={albumReviewsQuery.data?.length <= 15}
                  onClick={() => {
                    setSkip((prev) => prev + 15);
                    albumReviewsQuery.refetch();
                  }}
                >
                  Older
                  <HiChevronRight className="h-6 w-6" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AlbumDetails;

{
  /* <div className="mx-auto min-h-screen lg:w-1/2">
<nav className="flex items-center justify-between bg-slate-900 p-2">
  <button className="pl-2" onClick={() => Router.back()}>
    <HiArrowCircleLeft className="h-6 w-6" />
  </button>
  <p
    className="overflow-clip font-bold md:text-xl"
    title={albumData?.name}
  >
    {albumData?.name}
  </p>
  <div className="flex items-center justify-between gap-x-2 ">
    <div
      className="flex items-center justify-between gap-x-2 "
      ref={parent as LegacyRef<HTMLDivElement>}
    >
      {showSearch && (
        <div className="flex items-center justify-between gap-x-2">
          <button
            className="btn-ghost no-animation btn-sm btn"
            onClick={() => {
              setShowSearch((prev) => !prev);
            }}
          >
            <HiOutlineX />
          </button>
          <input type="text" name="" id="" className="input input-sm" />
        </div>
      )}
      <button
        className="btn-ghost btn-sm btn"
        onClick={() => {
          if (!showSearch) {
            setShowSearch((prev) => !prev);
          } else {
            //query
          }
        }}
      >
        <HiSearch className="h-4 w-4" />
      </button>
    </div>
    <div className="dropdown-end dropdown">
      <div className="avatar">
        <button className="m-2 rounded-full ring ring-white">
          <Image
            src="https://randomuser.me/api/portraits/women/94.jpg"
            alt="user"
            height={25}
            width={25}
            className="rounded-full "
          />
        </button>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <a>Item 2</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className="fixed bottom-0 left-1/2 mb-4 -translate-x-1/2 rounded-full border-2 bg-slate-200">
  Open modal
</div>
<main className="border-slate-600 px-3 pt-2">
  <AlbumInfoGrid albumData={albumData} />
  <AlbumStatsGrid />
  <div className="py-6">
    <AlbumReviewsGrid />
  </div>
</main>
</div> */
}
