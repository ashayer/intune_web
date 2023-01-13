import { type NextPage } from "next";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

const SPOTIFY_CLIENT_ID = "08cde527b9274e67ae6712b3cee86db9";
const SPOTIFY_SECRET = "058bd77f1e264452a0e97920a3a50757";
const SPOTIFY_URL = "https://api.spotify.com/v1/albums/";

const AlbumDetails: NextPage = () => {
  const [accessToken, setAccessToken] = useState("");

  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();

  const nrouter = useRouter();
  const { albumId } = nrouter.query;
  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        SPOTIFY_CLIENT_ID +
        "&client_secret=" +
        SPOTIFY_SECRET,
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((response) => response.json())
      .then((token) => {
        setAccessToken(token.access_token);

    const apiParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
      console.log(SPOTIFY_URL + apiParameters);
      const test = fetch(`${SPOTIFY_URL}${albumId as string}`, apiParameters)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAlbumData(data);
        });
    });
  }, []);

  return (
    <>
      <main className="bg-slate-600">
        <pre>{JSON.stringify(albumData, null, 2)}</pre>
      </main>
    </>
  );
};

export default AlbumDetails;
