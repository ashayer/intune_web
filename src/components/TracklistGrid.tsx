import TrackInfo from "./TrackInfo";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import type { LegacyRef} from "react";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const TracklistGrid = ({
  tracklistInfo,
}: {
  tracklistInfo: SpotifyApi.AlbumTracksResponse;
}) => {
  const [showTrackList, setShowTrackList] = useState(true);

  const [parent] = useAutoAnimate();
  return (
    <div
      className="flex w-full flex-col"
      ref={parent as LegacyRef<HTMLDivElement>}
    >
      <button
        onClick={() => setShowTrackList((prev) => !prev)}
        className="flex w-32 items-center justify-center place-self-center"
      >
        {showTrackList ? (
          <>
            hide track list
            <HiChevronUp />
          </>
        ) : (
          <>
            show track list
            <HiChevronDown />
          </>
        )}
      </button>

      {showTrackList &&
        tracklistInfo?.items.map((trackData, index) => (
          <TrackInfo key={index} trackData={trackData} />
        ))}
    </div>
  );
};

export default TracklistGrid;
