import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { BsChat, BsDot, BsHeart, BsThreeDots } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";

const SinglePost = () => {
  const convertUrlsToLinks = (text) => {
    // More comprehensive URL pattern
    const urlPattern =
      /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

    const parts = text.split(urlPattern);
    const matches = text.match(urlPattern) || [];

    return parts.map((part, index) => {
      if (index < matches.length) {
        const url = matches[index];
        const href = url.startsWith("http") ? url : `https://${url}`;
        return (
          <>
            {part}
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 break-all"
            >
              {url}
            </a>
          </>
        );
      }
      return part;
    });
  };

  return (
    <div className="py-6 w-full flex items-start gap-2 border-b-[0.5px] border-color">
      <div>
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-semibold">Sachin Kumar</span>
            <div className="flex items-center">
              <span className="opacity-70">@sachin777sk</span>
              <BsDot />
              <span className="opacity-70">Oct 12</span>
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="cursor-pointer">
                <BsThreeDots size={24} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">Copy Link</DropdownItem>
              {true && <DropdownItem key="settings">Delete Post</DropdownItem>}
              {true && (
                <DropdownItem key="settings">
                  Follow {"@sachin777sk"}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-1">
          <h1 className="text-lg font-semibold">This is Heading</h1>
          <p className="mt-1">
            {convertUrlsToLinks(
                "Check out my repos at github.com/sachin777sk and www.github.com/sachin777sk. You can also visit https://github.com/sachin777sk for more projects!"
            )}
          </p>
        </div>
        <div className="mt-4 w-full h-96 bg-slate-200 rounded-3xl"></div>
        <div className="mt-4 flex items-center justify-evenly">
          <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]">
            <BsChat size={16} />
            <span className="text-sm">1K</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]">
            <BsHeart size={16} />
            <span className="text-sm">12K</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]">
            <IoIosStats size={16} />
            <span className="text-sm">99K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
