import { type NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { trpc } from "../utils/trpc";
type Inputs = {
  searchText: string;
};

const Home: NextPage = () => {
  const [testAlbumData, setTestAlbumData] = useState<SpotifyApi.SearchResponse>(
    {} as SpotifyApi.SearchResponse
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.searchText.trim() !== "") {
      setSearchTest(data.searchText);
      test.refetch();
    }
    return null;
  };

  const [searchText, setSearchTest] = useState("");

  const test = trpc.example.test.useQuery(
    { text: searchText },
    {
      onSuccess: (data) => setTestAlbumData(data),
      enabled: searchText.length > 0,
    }
  );

  const { register, handleSubmit } = useForm<Inputs>();

  return (
    <>
      <main className="flex flex-col items-center bg-slate-600">
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </main>
    </>
  );
};

export default Home;

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
