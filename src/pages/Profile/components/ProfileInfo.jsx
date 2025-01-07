import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { RiLink } from "react-icons/ri";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  return (
    <div>
      <div className="pr-2 sm:pr-4 flex flex-col items-end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="cursor-pointer">
              <BsThreeDots size={24} />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="settings">
              <Link className="block w-full" to={"/edit-profile"}>
                Edit Profile
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <div className="h-36 md:h-44 w-36 md:w-44 rounded-full border-2 border-[var(--main-color)]">
          {false ? (
            <img
              className="w-full h-full rounded-full"
              src="https://pbs.twimg.com/profile_images/1847175865597112320/C0DbR5kX_400x400.jpg"
              alt="..."
            />
          ) : (
            <FaUserCircle className="h-full w-full" />
          )}
        </div>
      </div>
      <div className="flex items-center flex-col">
        <div className="mt-2 flex flex-col">
          <span className="text-2xl font-bold">{"Sachin Kumar"}</span>
          <span className="opacity-70 text-center">@{"sachin777s"}</span>
        </div>
        <div className="mt-2 text-xl">
          <span>Full Stack Engineer | Creator</span>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <Button
            className="text-base"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <span>1.8K</span>
            <span className="opacity-70">Followers</span>
          </Button>
          <Button
            className="text-base"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <span>89</span>
            <span className="opacity-70">Followings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
