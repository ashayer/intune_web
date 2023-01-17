import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineHeart, HiOutlineX } from "react-icons/hi";
import { trpc } from "../utils/trpc";
import { NoUserModal } from "./NoUserModal";

const AlbumInfoGrid = ({
  albumData,
}: {
  albumData: SpotifyApi.AlbumObjectFull | undefined;
}) => {
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);


  const likeAlbumQuery = trpc.album.likeAlbum.useMutation({
    onError: () => {
      setShowModal(true);
    },
  });

  return (
    <>
      <NoUserModal
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="grid grid-cols-3 grid-rows-3 border-b border-slate-600 sm:grid-cols-2">
        <div className="col-span-2 row-span-3 mx-auto my-6 text-center sm:col-span-1">
          <Image
            src={albumData?.images[0]?.url || ""}
            alt="album cover"
            className="rounded-xl"
            height={300}
            width={300}
          />
          <button
            className="btn-circle btn my-4 bg-red-900"
            onClick={() => {
              likeAlbumQuery.mutate({
                userId: session?.user?.id || "",
                albumId: albumData?.id as string,
              });
            }}
          >
            <HiOutlineHeart className=" h-8 w-8 text-red-500" />
          </button>
        </div>

        <div className="my-4 text-center">
          <p className="text-md font-semibold underline underline-offset-4">
            Artist
          </p>
          <p className="text-2xl font-bold">
            {albumData?.artists
              ?.map(function (artistinfo) {
                return artistinfo.name;
              })
              .join(", ")}
          </p>
        </div>
        <div className="my-4 text-center">
          <p className="text-md font-semibold underline underline-offset-4">
            Released
          </p>
          <p className="text-2xl font-bold">
            {albumData?.release_date.slice(0, 4)}
          </p>
        </div>
        <div className="my-4 text-center">
          <p className="text-md font-semibold underline underline-offset-4">
            Rating
          </p>
          <p className="text-2xl font-bold">N/A</p>
        </div>
      </div>
    </>
  );
};

export default AlbumInfoGrid;
