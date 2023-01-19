import { type NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import AlbumInfoGrid from "../../components/AlbumInfoGrid";
import AlbumReviewsGrid from "../../components/AlbumReviewsGrid";
import * as NextImage from "next/image";
import loadingGif from "../../assets/loading.gif";
import TracklistGrid from "../../components/TracklistGrid";
import { useSession } from "next-auth/react";
import { loadImage, analyzeImage, rgbToHex } from "../../assets/colorPicker";
import { HiChevronRight } from "react-icons/hi";

const SearchResults: NextPage = () => {
  const [searchResults, setSearchResults] =
    useState<SpotifyApi.SearchResponse>();

  const nrouter = useRouter();
  const { searchText } = nrouter.query;

  const searchQuery = trpc.search.searchWithText.useQuery(
    {
      text: searchText as string,
    },
    { onSuccess: (data) => setSearchResults(data) }
  );

  return <div>{searchText}</div>;
};

export default SearchResults;
