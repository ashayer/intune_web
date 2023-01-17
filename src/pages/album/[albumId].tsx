import { type NextPage } from "next";
import type { LegacyRef } from "react";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import AlbumStatsGrid from "../../components/AlbumStatsGrid";
import AlbumInfoGrid from "../../components/AlbumInfoGrid";
import AlbumReviewsGrid from "../../components/AlbumReviewsGrid";
import { HiArrowCircleLeft, HiSearch, HiOutlineX } from "react-icons/hi";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const AlbumDetails: NextPage = () => {
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();

  const [showSearch, setShowSearch] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

  const nrouter = useRouter();
  const { albumId } = nrouter.query;

  const albumInfoQuery = trpc.search.getAlbumInfoById.useQuery(
    {
      albumId: albumId as string,
    },
    {
      onSuccess: (data) => setAlbumData(data),
    }
  );

  return (
    <div className="mx-auto min-h-screen border-x border-slate-600 lg:w-1/2">
      <nav className="sticky top-0 flex items-center justify-between bg-slate-900 p-2">
        <button className="btn-ghost btn" onClick={() => Router.back()}>
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
                  className="btn-ghost no-animation btn"
                  onClick={() => {
                    setShowSearch((prev) => !prev);
                  }}
                >
                  <HiOutlineX />
                </button>
                <input type="text" name="" id="" className="input" />
              </div>
            )}
            <button
              className="btn-ghost btn"
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
            <label tabIndex={0} className="btn-ghost rounded-btn btn">
              Dropdown
            </label>
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
          <p className="text-center">Reviews</p>
          <AlbumReviewsGrid />
        </div>
      </main>
    </div>
  );
};

export default AlbumDetails;
