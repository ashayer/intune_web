import Image from "next/image";
import Router from "next/router";
import { useState } from "react";
import { HiHome, HiOutlineX, HiSearch } from "react-icons/hi";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { BsSoundwave } from "react-icons/bs";
import { useSession, signIn, signOut } from "next-auth/react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
type Inputs = {
  searchText: string;
};
const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [parent] = useAutoAnimate();

  const { data: session, status } = useSession();
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.searchText.trim() !== "") {
      Router.push(`/search/${data.searchText}`);
    }
    return null;
  };

  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-2">
      <button className="pl-2" onClick={() => Router.replace("/")}>
        <HiHome className="h-6 w-6" />
      </button>
      <span className="no-animation hidden items-center gap-x-1 font-extrabold md:flex">
        <BsSoundwave /> Intune
      </span>
      <div className="flex items-center justify-between gap-x-2 ">
        <div className="flex items-center justify-between gap-x-2 ">
          {showSearch && (
            <div className="flex items-center justify-between gap-x-2">
              <button
                className="btn-ghost no-animation btn-sm btn"
                onClick={() => {
                  setShowSearch((prev) => !prev);
                }}
              >
                <HiOutlineX />
              </button>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  autoFocus
                  type="text"
                  defaultValue=""
                  {...register("searchText")}
                  placeholder="Search for music..."
                  className="input input-sm bg-slate-600"
                />
              </form>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              type="submit"
              className="btn-ghost btn-sm btn"
              onClick={() => {
                if (!showSearch) {
                  setShowSearch((prev) => !prev);
                } else {
                  handleSubmit(onSubmit);
                }
              }}
            >
              <HiSearch className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div>
          {status === "loading" ? (
            <></>
          ) : (
            <>
              {status === "unauthenticated" ? (
                <button className="btn-sm btn" onClick={() => signIn()}>
                  Log in
                </button>
              ) : (
                <div className="dropdown-end dropdown">
                  <div className="avatar">
                    <button className="m-2 rounded-full ">
                      <Image
                        src={session?.user?.image as string}
                        alt="user"
                        height={25}
                        width={25}
                        className="rounded-full "
                      />
                    </button>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box mt-4 w-52 bg-base-100 p-2 shadow"
                  >
                    <li>
                      <button
                        onClick={() =>
                          Router.push(`/user/${session?.user?.id}`)
                        }
                      >
                        Profile
                      </button>
                    </li>
                    <li>
                      <button onClick={() => signOut()}>Sign out</button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
