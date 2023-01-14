import { type NextPage } from "next";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";

const SPOTIFY_CLIENT_ID = "08cde527b9274e67ae6712b3cee86db9";
const SPOTIFY_SECRET = "058bd77f1e264452a0e97920a3a50757";
const SPOTIFY_URL = "https://api.spotify.com/v1/albums/";

const AlbumDetails: NextPage = () => {
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();

  const nrouter = useRouter();
  const { albumId } = nrouter.query;

  const albumInfoQuery = trpc.search.getAlbumInfo.useQuery(
    {
      albumId: albumId as string,
    },
    {
      onSuccess: (data) => setAlbumData(data),
    }
  );

  console.log(albumInfoQuery.data);

  return (
    <>
      <main className="bg-slate-600">
        {/* <pre>{JSON.stringify(albumData, null, 2)}</pre> */}
        <p>{albumData?.name}</p>
        <p>
          {albumData?.artists
            ?.map(function (artistinfo) {
              return artistinfo.name;
            })
            .join(", ")}
        </p>
        <Image
          src={albumData?.images[0]?.url || ""}
          alt="album cover"
          className="rounded-xl"
          height={208}
          width={208}
        />
        <p>{albumData?.total_tracks}</p>
        <p>{albumData?.release_date}</p>
      </main>
    </>
  );
};

export default AlbumDetails;
