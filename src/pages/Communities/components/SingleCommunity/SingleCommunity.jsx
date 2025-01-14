import {
  Avatar,
  AvatarGroup,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { MdArticle } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import EditCommunityModal from "./EditCommunityModal";

const SingleCommunity = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const links = [
    {
      label: "Posts",
      path: "/communities/:id/posts",
      icon: <MdArticle />,
    },
    {
      label: "About",
      path: "/communities/:id/about",
      icon: <IoMdInformationCircle />,
    },
    {
      label: "Members",
      path: "/communities/:id/members",
      icon: <FaUsers />,
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/communities/:id/posts");
  }, []);

  return (
    <>
      <div className="px-2 sm:px-4 flex flex-col">
        <div className="self-end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="cursor-pointer">
                <BsThreeDots size={24} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">
                <Link onClick={onOpen} className="block w-full" to={"#"}>
                  Edit Community Settings
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <EditCommunityModal isOpen={isOpen} onOpenChange={onOpenChange} />
        </div>
        <div className="max-w-[200px] max-h-[200px] overflow-hidden rounded-2xl self-center">
          <img
            className="max-w-full max-h-full"
            src="https://cdn.pixabay.com/photo/2016/12/28/08/15/hummingbird-1935665_1280.png"
            alt=""
          />
        </div>
        <div className="relative px-2 sm:px-4 flex flex-col items-center">
          <span className="mt-2 text-3xl font-semibold text-center">
            NExt DEvs
          </span>
          <span className="mt-2 text-xl text-center">
            👽Welome to the {"NExt DEvs"} Community
          </span>
          <Link
            to={"/communities/4545/members"}
            className="mt-2 px-2 flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-900"
          >
            <AvatarGroup>
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                ))}
            </AvatarGroup>
            <span>
              <span className="font-semibold">860</span> Members
            </span>
          </Link>
          <div className="mt-2 mr-2 sm:mr-4">
            <Button radius="full" className="bg-[var(--main-color)] text-black">
              Join
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Section */}
      <div className="mt-4 py-1 px-2 grid grid-cols-3 gap-2 bg-[#D4D4D8] dark:bg-[#3F3F46]">
        {links.map((_, i) => (
          <NavLink
            className={({ isActive }) =>
              `${
                isActive && "bg-white dark:bg-black"
              } py-2 text-center rounded-xl flex items-center justify-center gap-1 ${
                !isActive && "hover:bg-[#edebeb] dark:hover:bg-[#151515]"
              }`
            }
            to={_.path}
          >
            {_.icon} {_.label}
          </NavLink>
        ))}
      </div>

      <div className="px-2 sm:px-4 pt-4 border-t-[0.5px] border-color">
        <Outlet />
      </div>
    </>
  );
};

export default SingleCommunity;
