"use client";
import React from "react";
import Image from "next/image";
import {
  LightBulbIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import Avatar from "react-avatar";

const Header = () => {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center bg-gray-800/10 rounded-b-2xl">

        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#8294d1] rounded-md filter blur-3xl opacity-50 -z-50">
            
        </div>

        <Image
          src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
          alt="Trello logo"
          width={100}
          height={100}
          className="w-44 md:w-56 pb-0 object-contain ml-3"
        />

        <div className="flex items-center space-x-5  flex-1 justify-end mr-3">
          {/* Search */}
          <form className="flex items-center space-x-5  rounded-md p-2 m-2 shadow-md flex-1 md:flex-initial bg-white">
            <MagnifyingGlassIcon className="text-gray-400 h-6 w-6" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Seach
            </button>
          </form>
          {/* avatar */}
          <Avatar
            name="Atharva Jadhav"
            round
            color="orange"
            src="https://avatars.githubusercontent.com/u/111676983?v=4"
            size="50"
          />
        </div>
      </div>

      <div
        className="flex items-center justify-center px5 py-2
      md:py-10"
      >
        <p className="flex items-center font-light pr-5 shadow-lg rounded-xl w-fit bg-white italic max-w-3xl p-5 text-lg">
          <LightBulbIcon className="inline-block h-10 w-10 text-neutral-700 mr-1" />
          GPT is summarising your tasks for today..🚀
        </p>
      </div>
    </header>
  );
};

export default Header;
