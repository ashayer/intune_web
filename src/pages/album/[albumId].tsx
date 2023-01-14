import { type NextPage } from "next";
import { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import Image from "next/image";

const SPOTIFY_CLIENT_ID = "08cde527b9274e67ae6712b3cee86db9";
const SPOTIFY_SECRET = "058bd77f1e264452a0e97920a3a50757";
const SPOTIFY_URL = "https://api.spotify.com/v1/albums/";

const AlbumDetails: NextPage = () => {
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull>();

  const nrouter = useRouter();
  const { albumId } = nrouter.query;

  const albumInfoQuery = trpc.search.getAlbumInfoById.useQuery(
    {
      albumId: albumId as string,
    },
    {
      onSuccess: (data) => setAlbumData(data),
    }
  );

  console.log(albumInfoQuery.data);

  return (
    <div className="mx-auto min-h-screen border-x lg:w-1/2">
      <nav className="flex justify-between p-2">
        <p className="text-3xl font-bold">back</p>
        <p className="text-3xl font-bold">{albumData?.name}</p>
        <p className="text-3xl font-bold">search</p>
      </nav>
      <main className="px-6 pt-2">
        <div className="grid grid-cols-2 grid-rows-3 border-b">
          <div className="col-span-2 row-span-3 mx-auto my-6 text-center sm:col-span-1">
            <Image
              src={albumData?.images[0]?.url || ""}
              alt="album cover"
              className="rounded-xl"
              height={384}
              width={384}
            />
            <button className="my-4">Like</button>
          </div>
          <div className="my-4 text-center">
            <p className="text-md font-semibold underline underline-offset-4">
              Artist
            </p>
            <p className="text-2xl font-bold">
              {albumData?.artists
                ?.map(function (artistinfo) {
                  return artistinfo.name;
                })
                .join(", ")}
            </p>
          </div>
          <div className="my-4 text-center">
            <p className="text-md font-semibold underline underline-offset-4">
              Released
            </p>
            <p className="text-2xl font-bold">
              {albumData?.release_date.slice(0, 4)}
            </p>
          </div>
          <div className="my-4 text-center">
            <p className="text-md font-semibold underline underline-offset-4">
              Rating
            </p>
            <p className="text-2xl font-bold">N/A</p>
          </div>
        </div>
        <div className="border-b py-6 text-center">
          <p>Rating stars</p>
          <div className="flex w-full justify-around">
            <div>
              <p>likes</p>
              <p className="text-3xl">1.5k</p>
            </div>
            <div>
              <p>ratings</p>
              <p className="text-3xl">1.5k</p>
            </div>
            <div>
              <p>reviews</p>
              <p className="text-3xl">1.5k</p>
            </div>
          </div>
        </div>
        <div className="py-6">
          <p>Reviews</p>
          <div className="flex w-full flex-col">
            <div className="flex border p-4">
              <Image
                src="https://randomuser.me/api/portraits/women/94.jpg"
                alt="user"
                height={50}
                width={50}
                className="mr-4 h-full rounded-full"
              />
              <div className="flex flex-col">
                <p>Username</p>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam et suscipit mi. Pellentesque libero orci, volutpat sed
                  diam ac, venenatis tempor enim. Curabitur vitae turpis non
                  lorem vestibulum gravida vitae ut est. Ut dictum vitae ipsum
                  eu finibus. Proin accumsan, augue vitae porttitor tincidunt,
                  lorem augue tincidunt urna, a porttitor magna libero ut ipsum.
                  In commodo sem quis dolor facilisis volutpat. Praesent sit
                  amet diam ut velit fermentum eleifend cursus eget odio.
                  Pellentesque pulvinar aliquet arcu, sit amet placerat nunc.
                  Nulla non nisl vulputate, hendrerit leo id, feugiat leo. Donec
                  massa nisi, sodales ut egestas nec, sagittis ac tortor. Cras
                  luctus nulla eget lacus venenatis vulputate. Pellentesque a
                  dapibus magna. Aliquam eget nibh vitae lectus mattis pharetra
                  nec a mauris. Praesent hendrerit nec urna nec hendrerit.
                  Nullam dolor nibh, blandit vitae magna ut, mollis euismod
                  tellus. Nam iaculis ligula eu felis aliquam, vitae sodales
                  sapien venenatis. Nunc sem leo, luctus quis ipsum vel,
                  tincidunt sollicitudin erat. Pellentesque nunc metus, lacinia
                  at venenatis quis, accumsan et orci. Nullam sodales interdum
                  tellus sit amet hendrerit. Vestibulum bibendum ullamcorper
                  risus ut semper. Morbi efficitur metus diam, eu dapibus tortor
                  ullamcorper et. Suspendisse potenti. Pellentesque finibus
                  vulputate purus, at mollis ante vulputate in. Nunc ut lacus
                  nibh. Sed convallis, nisl in tincidunt dictum, sapien tellus
                  pharetra dolor, eget ornare mi massa ut elit. Duis ac tellus
                  quis arcu elementum dictum vel a enim. Vestibulum tempor arcu
                  eu nibh tempor, eu accumsan turpis molestie. Donec urna
                  tortor, efficitur id ligula eu, vulputate posuere velit.
                  Maecenas eleifend, est vel ullamcorper dignissim, purus urna
                  efficitur sem, vel egestas leo nisl quis nibh. Sed imperdiet
                  sollicitudin ullamcorper. Duis nec vehicula erat. Morbi
                  interdum ligula et lectus faucibus bibendum. Maecenas id
                  volutpat eros. In hac habitasse platea dictumst. Quisque ut
                  fermentum leo. Nulla facilisi. Donec elementum odio ornare
                  pellentesque rhoncus. Curabitur euismod, ligula et porta
                  tristique, nisi purus sagittis risus, sit amet interdum neque
                  eros sit amet ex. Nam cursus sagittis faucibus. Duis venenatis
                  tempor magna at sollicitudin. Fusce hendrerit felis sit amet
                  sapien scelerisque tincidunt. Sed quis rutrum magna, non
                  tempor odio. Fusce odio libero, lacinia sed orci eget, iaculis
                  egestas libero. Morbi tincidunt eget mauris et dapibus.
                  Curabitur purus massa, eleifend nec faucibus quis, tempus at
                  turpis. Vivamus euismod augue ac libero dapibus, id laoreet
                  lectus fringilla. Etiam dapibus eget metus in sodales.
                  Praesent sagittis dignissim metus in rhoncus. Aenean ultrices
                  nulla vel lacus commodo, sit amet porta orci ullamcorper.
                  Vestibulum ante ipsum primis in faucibus orci luctus et
                  ultrices posuere cubilia curae; Curabitur sagittis
                  pellentesque pellentesque. Donec et eleifend tellus. Phasellus
                  tristique imperdiet consectetur. Duis rutrum accumsan
                  ultricies. Curabitur bibendum tempor feugiat. Nam porttitor
                  massa augue, convallis iaculis sem aliquet non. Ut vestibulum,
                  lectus vel luctus vulputate, magna ex condimentum odio, et
                  rutrum odio est nec justo. Etiam ultrices vitae dolor nec
                  mollis. Donec semper, diam a ornare hendrerit, mauris lacus
                  mattis libero, in finibus nisi urna vitae massa. Nulla
                  hendrerit est ut euismod tristique. Curabitur commodo porta
                  sem, at tincidunt ligula varius a. Nullam facilisis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlbumDetails;
