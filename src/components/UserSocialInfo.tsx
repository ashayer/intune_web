import Image from "next/image";
import Router from "next/router";
import { trpc } from "../utils/trpc";
import loadingGif from "../assets/loading.gif";

const UserSocialInfo = ({ userId }: { userId: string }) => {
  const getBasicInfo = trpc.social.getBasicInfo.useQuery({
    userId: userId,
  });

  return getBasicInfo.isLoading ? (
    <div className="flex h-screen items-center justify-center">
      <div className="h-24 w-24 animate-pulse">
        <Image src={loadingGif} alt="" />
      </div>
    </div>
  ) : (
    <>
      {getBasicInfo.data && (
        <div className="flex items-center">
          <Image
            src={getBasicInfo.data.image as string}
            width={64}
            height={64}
            alt="user"
            className="mr-4 rounded-full"
          />
          <p
            className="cursor-pointer hover:text-slate-500"
            onClick={() => Router.push(`/user/${userId}`)}
          >
            {getBasicInfo.data.name}
          </p>
        </div>
      )}
    </>
  );
};

export default UserSocialInfo;
