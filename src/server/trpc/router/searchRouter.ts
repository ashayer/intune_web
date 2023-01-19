import { z } from "zod";

import { router, publicProcedure } from "../trpc";

import type { PopularChartResponse } from "../../../types/popular";

const SPOTIFY_URL = "https://api.spotify.com/v1/search";

const authParameters = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body:
    "grant_type=client_credentials&client_id=" +
    process.env.SPOTIFY_CLIENT_ID +
    "&client_secret=" +
    process.env.SPOTIFY_SECRET,
};

export const searchRouter = router({
  searchWithText: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      let accessToken;
      let result: SpotifyApi.SearchResponse = {};
      await fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((response) => response.json())
        .then((token) => {
          accessToken = token.access_token;
        });

      const apiParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      await fetch(
        `${SPOTIFY_URL}?q=${input.text}&type=album,artist&limit=18`,
        apiParameters
      )
        .then((response) => response.json())
        .then((data: SpotifyApi.SearchResponse) => {
          result = data;
        });

      return result;
    }),
  getPopular: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async () => {
      let result = null;

      await fetch(
        "https://charts-spotify-com-service.spotify.com/public/v0/charts"
      )
        .then((response) => response.json())
        .then((data: PopularChartResponse) => {
          result = data;
        });

      return result;
    }),
  getAlbumInfoById: publicProcedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input }) => {
      let accessToken;
      let result: SpotifyApi.AlbumObjectFull = {} as SpotifyApi.AlbumObjectFull;
      await fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((response) => response.json())
        .then((token) => {
          accessToken = token.access_token;
        });

      const apiParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      await fetch(
        `https://api.spotify.com/v1/albums/${input.albumId as string}`,
        apiParameters
      )
        .then((response) => response.json())
        .then((data: SpotifyApi.AlbumObjectFull) => {
          result = data;
        });
      return result;
    }),
  getAlbumTracksById: publicProcedure
    .input(z.object({ albumId: z.string() }))
    .query(async ({ input }) => {
      let accessToken;
      let result: SpotifyApi.AlbumTracksResponse =
        {} as SpotifyApi.AlbumTracksResponse;
      await fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((response) => response.json())
        .then((token) => {
          accessToken = token.access_token;
        });

      const apiParameters = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      };

      await fetch(
        `https://api.spotify.com/v1/albums/${
          input.albumId as string
        }/tracks?limit=50&market=US`,
        apiParameters
      )
        .then((response) => response.json())
        .then((data: SpotifyApi.AlbumTracksResponse) => {
          result = data;
        });
      return result;
    }),
  getNewReleases: publicProcedure.query(async ({ input }) => {
    let accessToken;
    let result: SpotifyApi.AlbumObjectFull[] = [];
    await fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((token) => {
        accessToken = token.access_token;
      });

    const apiParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    await fetch(`https://api.spotify.com/v1/browse/new-releases`, apiParameters)
      .then((response) => response.json())
      .then((data: SpotifyApi.AlbumObjectFull[]) => {
        result = data;
      });
    console.log(result);
    return result;
  }),
});
