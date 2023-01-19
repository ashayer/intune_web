import Image from "next/image";
import Router from "next/router";
import placeHolder from "../assets/musicPlaceholder.png";

const SearchResultCard = ({
  entry,
  type,
}: {
  entry: SpotifyApi.AlbumObjectSimplified | SpotifyApi.ArtistObjectFull;
  type: string;
}) => {
  if (type === "album") {
    return (
      <div className="flex flex-col items-center justify-start text-center">
        <button
          className=" transition-all hover:scale-95"
          onClick={() => {
            if (entry.type === "album") {
              Router.push(`/album/${entry.id}`);
            }
          }}
        >
          <Image
            title={entry.name}
            src={entry.images[1]?.url || placeHolder}
            alt="album cover"
            className="rounded-xl"
            height={150}
            width={150}
          />
        </button>
        <p className="text-center">{entry.name}</p>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-start text-center">
        <button
          key={entry.images[1]?.url || ""}
          className="transition-all hover:scale-95"
        >
          <Image
            className="aspect-square rounded-xl object-cover"
            title={entry.name}
            src={entry.images[1]?.url || placeHolder}
            alt="artist cover"
            height={150}
            width={150}
          />
        </button>
        <p className="text-center">{entry.name}</p>
      </div>
    );
  }
};

export default SearchResultCard;
