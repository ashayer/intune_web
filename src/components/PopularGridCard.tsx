import type { EntriesEntity } from "../types/popular";
import Image from "next/image";
import Router from "next/router";
import { RefObject, useState } from "react";
const PopularGridCard = ({
  entry,
  type,
}: {
  entry: EntriesEntity;
  type: string;
}) => {
  const [loading, setLoading] = useState(true);

  if (type === "album") {
    return (
      <button
        key={entry.albumMetadata?.albumUri}
        className="transition-all hover:scale-95 "
        onClick={() =>
          Router.push(`album/${entry.albumMetadata?.albumUri.slice(14)}`)
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
          blurDataURL={entry.albumMetadata?.displayImageUri as string}
        />
      </button>
    );
  } else {
    return (
      <button
        key={entry.artistMetadata?.artistUri}
        className="transition-all hover:scale-95"
      >
        <Image
          className="aspect-square rounded-xl object-cover"
          title={entry.artistMetadata?.artistName}
          src={entry.artistMetadata?.displayImageUri || ""}
          alt="artist cover"
          height={208}
          width={208}
          blurDataURL={entry.artistMetadata?.displayImageUri as string}
        />
      </button>
    );
  }
};

export default PopularGridCard;
