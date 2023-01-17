import Image from "next/image";
import Router from "next/router";
import type { LegacyRef } from "react";
import { useState } from "react";
import { HiArrowCircleLeft, HiOutlineX, HiSearch } from "react-icons/hi";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [parent] = useAutoAnimate(/* optional config */);
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-2">
      <button className="pl-2" onClick={() => Router.back()}>
        <HiArrowCircleLeft className="h-6 w-6" />
      </button>
      <button className="no-animation font-extrabold">I|I|I INTUNE</button>
      <div className="flex items-center justify-between gap-x-2 ">
        <div
          className="flex items-center justify-between gap-x-2 "
          ref={parent as LegacyRef<HTMLDivElement>}
        >
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
              <input
                type="text"
                name=""
                id=""
                className="input input-sm bg-slate-600"
              />
            </div>
          )}
          <button
            className="btn-ghost btn-sm btn"
            onClick={() => {
              if (!showSearch) {
                setShowSearch((prev) => !prev);
              } else {
                //query
              }
            }}
          >
            <HiSearch className="h-4 w-4" />
          </button>
        </div>
        <div className="dropdown-end dropdown">
          <div className="avatar">
            <button className="m-2 rounded-full ring ring-white">
              <Image
                src="https://randomuser.me/api/portraits/women/94.jpg"
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
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
