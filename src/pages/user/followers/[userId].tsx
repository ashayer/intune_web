import { type NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Router from "next/router";
import { trpc } from "../../../utils/trpc";

import loadingGif from "../../../assets/loading.gif";
import UserSocialInfo from "../../../components/UserSocialInfo";

const UserDetails: NextPage = () => {
  const nrouter = useRouter();
  const { userId } = nrouter.query;
  const getBasicInfo = trpc.social.getBasicInfo.useQuery({
    userId: userId as string,
  });

  const followersList = trpc.social.getFollowersList.useQuery({
    userId: userId as string,
  });

  return getBasicInfo.isLoading && !getBasicInfo.isSuccess ? (
    <div className="flex h-screen items-center justify-center">
      <div className="h-24 w-24 animate-pulse">
        <Image src={loadingGif} alt="" />
      </div>
    </div>
  ) : (
    <div className="mx-auto min-h-screen max-w-7xl">
      <div className="flex flex-col items-center p-4 md:flex-row">
        <div className="flex flex-1 items-center p-4">
          <div className="flex  px-4">
            <Image
              src={getBasicInfo.data?.image as string}
              alt="User Profile"
              width={96}
              height={96}
              className="m-4 rounded-full"
            />
          </div>
          <a
            className="cursor-pointer text-xl font-bold hover:text-slate-700"
            onClick={() => Router.push(`/user/${userId}`)}
          >
            {getBasicInfo.data?.name}
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 px-4">
        <p className="w-full text-center text-xl font-bold text-slate-300">
          Followers
        </p>
      </div>
      <div className="mx-auto flex flex-col gap-y-4 px-6">
        {followersList.data &&
          followersList.data.map((user) => (
            <div key={user.userId}>
              <UserSocialInfo userId={user.userId} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserDetails;
