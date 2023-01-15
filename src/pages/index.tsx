import { type NextPage } from "next";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import type { PopularChartResponse } from "../types/popular";
import Navbar from "../components/Navbar";
import PopularGrid from "../components/PopularGrid";

type Inputs = {
  searchText: string;
};

const Home: NextPage = () => {
  const [testAlbumData, setTestAlbumData] = useState<SpotifyApi.SearchResponse>(
    {} as SpotifyApi.SearchResponse
  );

  const [popularData, setPopularData] = useState<PopularChartResponse>(
    {} as PopularChartResponse
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.searchText.trim() !== "") {
      setSearchText(data.searchText);
      searchTextQuery.refetch();
    }
    return null;
  };

  const [searchText, setSearchText] = useState("");

  const searchTextQuery = trpc.search.searchWithText.useQuery(
    { text: searchText },
    {
      onSuccess: (data) => setTestAlbumData(data),
      enabled: searchText.length > 0,
    }
  );

  const getPopularQuery = trpc.search.getPopular.useQuery(
    { text: "" },
    {
      onSuccess: (data: PopularChartResponse) => setPopularData(data),
    }
  );

  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center lg:w-1/2">
      <div className="flex min-h-screen flex-col justify-start border-slate-500 sm:border-x">
        <Navbar />
        <div>
          <p className=" p-6 text-center font-bold md:text-4xl">
            popular this week
          </p>
          <PopularGrid popularData={popularData} type="album" />
          <p className="p-6 font-bold md:text-3xl">albums</p>
          <PopularGrid popularData={popularData} type="artist" />
        </div>
      </div>
    </main>
  );
};

export default Home;

{
  /* <div className="grid grid-cols-2 gap-6 px-6 md:grid-cols-4 2xl:grid-cols-6">
            {popularData.chartEntryViewResponses &&
              popularData.chartEntryViewResponses[1]?.entries
                ?.slice(0, 12)
                .map((entry, index) => (
                  <button
                    key={index}
                    className="transition-all hover:scale-95"
                    onClick={() =>
                      Router.push(
                        `album/${entry.albumMetadata?.albumUri.slice(14)}`
                      )
                    }
                  >
                    <Image
                      title={`${
                        entry.albumMetadata?.albumName
                      } by ${entry.albumMetadata?.artists
                        ?.map(function (artistinfo) {
                          return artistinfo.name;
                        })
                        .join(", ")}`}
                      src={entry.albumMetadata?.displayImageUri || ""}
                      alt="album cover"
                      className="rounded-xl"
                      height={208}
                      width={208}
                    />
                  </button>
                ))}
          </div>
        </div>
        <div className="mb-10">
          <p className="p-6 text-right font-bold md:text-3xl">artists</p>
          <div className="grid grid-cols-2 gap-6 px-6 md:grid-cols-4 2xl:grid-cols-6">
            {popularData.chartEntryViewResponses &&
              popularData.chartEntryViewResponses[2]?.entries
                ?.slice(0, 12)
                .map((entry, index) => (
                  <button key={index} className="transition-all hover:scale-95">
                    <Image
                      className="aspect-square rounded-xl object-cover"
                      title={entry.artistMetadata?.artistName}
                      src={entry.artistMetadata?.displayImageUri || ""}
                      alt="artist cover"
                      height={208}
                      width={208}
                    />
                  </button>
                ))}
          </div>
        </div> */
}
