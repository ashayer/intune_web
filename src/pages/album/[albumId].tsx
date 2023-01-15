import { type NextPage } from "next";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import AlbumStatsGrid from "../../components/AlbumStatsGrid";
import AlbumInfoGrid from "../../components/AlbumInfoGrid";
import AlbumReviewsGrid from "../../components/AlbumReviewsGrid";

const SPOTIFY_CLIENT_ID = "08cde527b9274e67ae6712b3cee86db9";
const SPOTIFY_SECRET = "058bd77f1e264452a0e97920a3a50757";
const SPOTIFY_URL = "https://api.spotify.com/v1/albums/";

const AlbumDetails: NextPage = () => {
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();

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

  console.log(albumInfoQuery.data);

  return (
    <div className="mx-auto min-h-screen border-x border-slate-600 lg:w-1/2">
      <nav className="flex justify-between p-2">
        <p className="text-3xl font-bold">back</p>
        <p className="text-3xl font-bold">{albumData?.name}</p>
        <p className="text-3xl font-bold">search</p>
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
