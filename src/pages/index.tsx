import { type NextPage } from "next";
import type { LegacyRef } from "react";
import { useState } from "react";
// import type { SubmitHandler } from "react-hook-form";
// import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import type { PopularChartResponse } from "../types/popular";
import PopularGrid from "../components/PopularGrid";

const Home: NextPage = () => {
  const [popularData, setPopularData] = useState<PopularChartResponse>(
    {} as PopularChartResponse
  );

  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   if (data.searchText.trim() !== "") {
  //     setSearchText(data.searchText);
  //     searchTextQuery.refetch();
  //   }
  //   return null;
  // };

  // const [searchText, setSearchText] = useState("");

  // const searchTextQuery = trpc.search.searchWithText.useQuery(
  //   { text: searchText },
  //   {
  //     onSuccess: (data) => setTestAlbumData(data),
  //     enabled: searchText.length > 0,
  //   }
  // );

  const getPopularQuery = trpc.search.getPopular.useQuery(
    { text: "" },
    {
      onSuccess: (data: PopularChartResponse) => setPopularData(data),
    }
  );

  return (
    <>
      <main className="mx-auto flex flex-col items-center lg:w-1/2">
        {true || getPopularQuery.isLoading ? (
          <div className="h-screen">
            <div className="h-1/6 animate-spin border"></div>
          </div>
        ) : (
          <div className="flex min-h-screen w-full flex-col justify-start pb-6">
            <div>
              <p className="p-6 text-center text-4xl font-bold ">
                popular this week
              </p>
              <PopularGrid popularData={popularData} type="album" />
              <PopularGrid popularData={popularData} type="artist" />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
