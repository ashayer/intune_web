import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { trpc } from "../utils/trpc";
import type { PopularChartResponse } from "../types/popular";

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
      <div className="flex min-h-screen flex-col justify-between border-slate-500 sm:border-x">
        <nav className="flex justify-between border-b border-slate-500 p-6">
          <p className="text-3xl font-extrabold">Intune</p>
          <p className="text-3xl">Search</p>
        </nav>
        <div>
          <p className="p-6 font-bold md:text-3xl">
            most popular albums this week
          </p>
          <div className="grid grid-cols-2 gap-6 px-6 md:grid-cols-4 2xl:grid-cols-6">
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
          <p className="p-6 text-right font-bold md:text-3xl">
            most popular artists this week
          </p>
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
        </div>
      </div>
    </main>
  );
};

export default Home;

//https://charts-spotify-com-service.spotify.com/public/v0/charts

// const searchThing = async (input: string) => {
//   const apiParameters = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + accessToken,
//     },
//   };
//   console.log(SPOTIFY_URL + apiParameters);
//   const test = await fetch(
//     `${SPOTIFY_URL}?q=${input}&type=album,artist`,
//     apiParameters
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       setTestAlbumData(data);
//     });
// };

// useEffect(() => {
//   const authParameters = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body:
//       "grant_type=client_credentials&client_id=" +
//       SPOTIFY_CLIENT_ID +
//       "&client_secret=" +
//       SPOTIFY_SECRET,
//   };

//   fetch("https://accounts.spotify.com/api/token", authParameters)
//     .then((response) => response.json())
//     .then((token) => {
//       console.log(token.access_token);
//       setAccessToken(token.access_token);
//     });
// }, []);

/* <form onSubmit={handleSubmit(onSubmit)}>
          <input
            defaultValue=""
            placeholder="Search"
            {...register("searchText")}
            className="input w-full max-w-xs"
          />
        </form>
        <div>
          {test.isRefetching && test.isFetching && !test.isSuccess && (
            <progress className="progress"></progress>
          )}
          {testAlbumData.albums?.items && (
            <div className="grid grid-cols-8 gap-5">
              {testAlbumData.albums.items.map(
                (data, index) =>
                  data.images.length > 0 && (
                    <div
                      key={index}
                      className="border-2"
                      onClick={() => Router.push(`/album/${data.id}`)}
                    >
                      <p>{data.id}</p>
                      <Image
                        src={data.images[1]?.url as string}
                        alt="album cover"
                        height={200}
                        width={200}
                      />
                      <p>{data.name}</p>
                    </div>
                  )
              )}
            </div>
          )}
        </div> */
