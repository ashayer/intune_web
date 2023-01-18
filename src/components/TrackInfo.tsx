import { MdExplicit } from "react-icons/md";
import { HiPlay } from "react-icons/hi";
const msToSeconds = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const TrackInfo = ({
  trackData,
}: {
  trackData: SpotifyApi.TrackObjectSimplified;
}) => {
  return (
    <div className="flex items-center justify-between pr-4 text-xs">
      <div className="flex flex-1 items-center">
        <p className="w-10 p-2 text-right">{trackData.track_number}</p>
        <div className="flex flex-1">
          {trackData.explicit && <MdExplicit className="h-4 w-4" />}
          <p className="font-bold">{trackData.name}</p>
        </div>
      </div>
      <p>{msToSeconds(trackData.duration_ms)}</p>
      {/* <button onClick={() => console.log(trackData.preview_url)}>
        <HiPlay className="h-6 w-6" />
      </button> */}
    </div>
  );
};

export default TrackInfo;
