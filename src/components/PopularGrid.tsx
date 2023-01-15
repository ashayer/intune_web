import type { PopularChartResponse } from "../types/popular";
import PopularGridCard from "./PopularGridCard";

const PopularGrid = ({
  popularData,
  type,
}: {
  popularData: PopularChartResponse;
  type: string;
}) => {
  if (type === "album") {
    return (
      <div className="grid grid-cols-2 gap-6 px-6 md:grid-cols-4 2xl:grid-cols-6">
        {popularData.chartEntryViewResponses &&
          popularData.chartEntryViewResponses[1]?.entries
            ?.slice(0, 12)
            .map((entry, index) => (
              <PopularGridCard key={index} entry={entry} type="album" />
            ))}
      </div>
    );
  } else
    return (
      <div className="grid grid-cols-2 gap-6 px-6 md:grid-cols-4 2xl:grid-cols-6">
        {popularData.chartEntryViewResponses &&
          popularData.chartEntryViewResponses[2]?.entries
            ?.slice(0, 12)
            .map((entry, index) => (
              <PopularGridCard key={index} entry={entry} type="artist" />
            ))}
      </div>
    );
};

export default PopularGrid;
