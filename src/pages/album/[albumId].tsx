import { type NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import AlbumStatsGrid from "../../components/AlbumStatsGrid";
import AlbumInfoGrid from "../../components/AlbumInfoGrid";
import AlbumReviewsGrid from "../../components/AlbumReviewsGrid";


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

  return (
    <div className="mx-auto min-h-screen border-x border-slate-600 lg:w-1/2">
      <nav className="sticky top-0 flex justify-between bg-slate-900 p-2">
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
