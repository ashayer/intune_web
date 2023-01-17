import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
  HiOutlineHeart,
  HiHeart,
  HiStar,
  HiDocumentText,
} from "react-icons/hi";
import { trpc } from "../utils/trpc";
import { NoUserModal } from "./NoUserModal";
import AlbumPlaceholder from "../assets/AlbumPlaceholder.jpg";
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
    <div className="sticky top-10 flex flex-col items-center gap-y-4 text-center">
      <Image
        src={albumData?.images[0]?.url || AlbumPlaceholder}
        alt="album cover"
        className="rounded-xl"
        height={240}
        width={240}
      />
      <button
        onClick={() => {
          likeAlbumQuery.mutate({
            userId: session?.user?.id || "",
            albumId: albumData?.id as string,
          });
        }}
      >
        <HiOutlineHeart className="h-8 w-8" />
      </button>
      stars here
      <div className="w-full border-b border-slate-600">
        <p className="text-md font-semibold underline underline-offset-4">
          Artist
        </p>
        <p className="mb-4 text-2xl font-bold">
          {albumData?.artists
            ?.map(function (artistinfo) {
              return artistinfo.name;
            })
            .join(", ")}
        </p>

        <p className="text-md font-semibold underline underline-offset-4">
          Released
        </p>
        <p className="mb-4 text-2xl font-bold">
          {albumData?.release_date.slice(0, 4)}
        </p>

        <p className="text-md font-semibold underline underline-offset-4">
          Rating
        </p>
        <p className="mb-4 text-2xl font-bold">N/A</p>
      </div>
      <div className="flex w-full justify-evenly">
        <div>
          <HiHeart className="h-8 w-8 text-red-500" />
          <p>152</p>
        </div>
        <div>
          <HiStar className="h-8 w-8 text-yellow-500" />
          <p>12</p>
        </div>
        <div>
          <HiDocumentText className="h-8 w-8 text-red-500" />
          <p>447</p>
        </div>
      </div>
      <NoUserModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default AlbumInfoGrid;

{
  /* <div className="grid grid-cols-3 grid-rows-3 border-b border-slate-600 sm:grid-cols-2">
<div className="col-span-2 row-span-3 mx-auto my-6 text-center sm:col-span-1">
  <Image
    src={albumData?.images[0]?.url || ""}
    alt="album cover"
    className="rounded-xl"
    height={240}
    width={240}
  />
  <button
    onClick={() => {
      likeAlbumQuery.mutate({
        userId: session?.user?.id || "",
        albumId: albumData?.id as string,
      });
    }}
  >
    <HiOutlineHeart className="h-8 w-8 text-red-500" />
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
</div> */
}
