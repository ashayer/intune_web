import { z } from "zod";

import { router, publicProcedure } from "../trpc";

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

export const exampleRouter = router({
  test: publicProcedure
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
        `${SPOTIFY_URL}?q=${input.text}&type=album,artist`,
        apiParameters
      )
        .then((response) => response.json())
        .then((data: SpotifyApi.SearchResponse) => {
          result = data;
        });

      return result;
    }),
});
