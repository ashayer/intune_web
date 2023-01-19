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

const AlbumDetails: NextPage = () => {
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();
  const [tracklistInfo, setTracklistInfo] =
    useState<SpotifyApi.AlbumTracksResponse>();

  const [bgColor, setbgColor] = useState("black");
  const [reviewsList, setReviewList] = useState();

  const { data: session } = useSession();

  const nrouter = useRouter();
  const { albumId } = nrouter.query;

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
              setbgColor(rgbToHex(palette[0].r, palette[0].g, palette[0].b));
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
    },
    {
      refetchOnWindowFocus: false,
    }
    // {
    //   onSuccess: (data) => setReviewList(data),
    // }
  );

  // console.log(albumStatsQuery.data?.albumAverageRating._avg.rating)

  return (
    <div
      style={{
        background: bgColor,
      }}
    >
      <div
        className="mx-auto min-h-screen max-w-7xl"
        style={{
          backgroundColor: "#121212",
          boxShadow: "0 0 40px 75px #121212",
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
              <AlbumReviewsGrid
                albumReviews={albumReviewsQuery.data}
                albumId={albumId as string}
              />
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
