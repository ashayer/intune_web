import Image from "next/image";

const AlbumInfoGrid = ({
  albumData,
}: {
  albumData: SpotifyApi.AlbumObjectFull | undefined;
}) => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 border-b border-slate-600 sm:grid-cols-2">
      <div className="col-span-2 row-span-3 mx-auto my-6 text-center sm:col-span-1">
        <Image
          src={albumData?.images[0]?.url || ""}
          alt="album cover"
          className="rounded-xl"
          height={384}
          width={384}
        />
        <button className="my-4">Like</button>
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
  );
};

export default AlbumInfoGrid;
