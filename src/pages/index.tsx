import { type NextPage } from "next";
import { LegacyRef, useState } from "react";
// import type { SubmitHandler } from "react-hook-form";
// import { useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import type { PopularChartResponse } from "../types/popular";
import Navbar from "../components/Navbar";
import PopularGrid from "../components/PopularGrid";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home: NextPage = () => {
  const [popularData, setPopularData] = useState<PopularChartResponse>(
    {} as PopularChartResponse
  );
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);

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
    <main className="mx-auto flex flex-col items-center lg:w-1/2">
      <Navbar />
      {getPopularQuery.isLoading && getPopularQuery.isSuccess ? (
        <div className="animate-spin"></div>
      ) : (
        <div className="flex w-full flex-col justify-start border-slate-500 pb-4">
          <div ref={parent as LegacyRef<HTMLDivElement> | undefined}>
            <p className="p-6 text-center text-4xl font-bold">
              popular this week
            </p>
            <PopularGrid popularData={popularData} type="album" />
            <PopularGrid popularData={popularData} type="artist" />
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
