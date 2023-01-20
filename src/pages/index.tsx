import { type NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import type { PopularChartResponse } from "../types/popular";
import PopularGrid from "../components/PopularGrid";
import loadingGif from "../assets/loading.gif";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Router from "next/router";
import RecentActivity from "../components/RecentActivity";

const Home: NextPage = () => {
  const [popularData, setPopularData] = useState<PopularChartResponse>(
    {} as PopularChartResponse
  );

  const getPopularQuery = trpc.search.getPopular.useQuery(
    { text: "" },
    {
      onSuccess: (data: PopularChartResponse) => setPopularData(data),
    }
  );

  const { data: session, status } = useSession();

  return (
    <>
      <main className="mx-auto flex max-w-7xl flex-col items-center">
        {status === "authenticated" && <RecentActivity />}
        {getPopularQuery.isLoading ? (
          <div className="relative flex h-screen items-center">
            <div className="h-24 w-24 animate-pulse">
              <Image src={loadingGif} alt="" />
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen w-full flex-col justify-start pb-6">
            <div>
              <p className="p-6 text-center text-4xl font-bold ">
                popular this week
              </p>
              <PopularGrid popularData={popularData} type="album" />
              {/* <PopularGrid popularData={popularData} type="artist" /> */}
            </div>
          </div>
        )}
      </main>
      <div className="mx-auto flex max-w-7xl flex-col items-center"></div>
    </>
  );
};

export default Home;
