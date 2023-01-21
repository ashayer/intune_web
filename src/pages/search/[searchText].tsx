import { type NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";
import { useSession } from "next-auth/react";
import SearchResultCard from "../../components/SearchResultCard";
import placeHolder from "../../assets/albumPlaceholder.jpg";
import loadingGif from "../../assets/loading.gif";

const SearchResults: NextPage = () => {
  const [searchResults, setSearchResults] =
    useState<SpotifyApi.SearchResponse>();

  const nrouter = useRouter();
  const { searchText } = nrouter.query;

  const [topResult, setTopResult] = useState<
    SpotifyApi.AlbumObjectSimplified | SpotifyApi.ArtistObjectFull
  >();

  const searchQuery = trpc.search.searchWithText.useQuery(
    {
      text: searchText as string,
    },
    {
      onSuccess: (data) => {
        setSearchResults(data);

        const topAlbumResult = data.albums?.items[0];
        const topArtistResult = data.artists?.items[0];

        console.log(topAlbumResult?.name, topArtistResult?.name);

        // if (
        //   topArtistResult?.name.toLowerCase().includes(searchText as string)
        // ) {
        //   setTopResult(topArtistResult);
        // } else if (
        //   topArtistResult?.name.toLowerCase().includes(searchText as string)
        // ) {
        //   setTopResult(topAlbumResult);
        // } else {
        //   setTopResult(topAlbumResult);
        // }

        setTopResult(topAlbumResult);
      },
    }
  );

  return searchQuery.isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <div className="h-36 w-36 animate-pulse">
        <Image src={loadingGif} alt="" />
      </div>
    </div>
  ) : (
    <div className="mx-auto flex max-w-7xl flex-col pb-10">
      <div className="text-center">
        <p className="p-2 text-xl font-bold">Top Result</p>
        {topResult?.type === "artist" ? (
          <button className="transition-all hover:scale-95">
            <p>Artist</p>
            <Image
              className="aspect-square rounded-xl object-cover"
              title={topResult.name}
              src={topResult.images[1]?.url || placeHolder}
              alt="artist cover"
              height={208}
              width={208}
            />
            <p className="text-lg font-bold">{topResult.name}</p>
          </button>
        ) : (
          <button className="transition-all hover:scale-95">
            <p>Album</p>
            <Image
              className="aspect-square rounded-xl object-cover"
              title={topResult?.name}
              src={topResult?.images[1]?.url || placeHolder}
              alt="artist cover"
              height={208}
              width={208}
            />
            <p className="text-lg font-bold">{topResult?.name}</p>
          </button>
        )}
      </div>
      <div>
        <p className="p-6 font-bold md:text-3xl">albums</p>
        <div className="grid grid-cols-4 gap-2 px-2 md:grid-cols-6 2xl:grid-cols-10">
          {searchResults?.albums?.items &&
            searchResults?.albums?.items.map((entry, index) => (
              <SearchResultCard key={index} entry={entry} type="album" />
            ))}
        </div>
      </div>
      {/* <div>
        <p className="p-6 font-bold md:text-3xl">artists</p>
        <div className="grid grid-cols-3 gap-2 px-2 md:grid-cols-4 2xl:grid-cols-6">
          {searchResults?.artists?.items &&
            searchResults?.artists?.items.map((entry, index) => (
              <SearchResultCard key={index} entry={entry} type="artist" />
            ))}
        </div>
      </div> */}
    </div>
  );
};

export default SearchResults;
