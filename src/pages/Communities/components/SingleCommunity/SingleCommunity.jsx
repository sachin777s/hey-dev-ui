import { Avatar, AvatarGroup, Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { MdArticle } from "react-icons/md";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const SingleCommunity = () => {
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

  useEffect(()=>{
    navigate("/communities/:id/posts")
  },[])

  return (
    <>
      <div className="">
        <img
          className="w-full"
          src="https://pbs.twimg.com/community_banner_img/1579498877941649408/ib8y5Ccy?format=jpg&name=360x360"
          alt=""
        />
        <div className="pl-2 sm:pl-4 flex flex-col">
          <span className="mt-2 text-3xl font-semibold">NExt DEvs</span>
          <span className="mt-2 text-xl">
            👽Welome to the {"NExt DEvs"} Community
          </span>
          <div className="mt-2 flex items-center justify-between gap-4">
            <Link
              to={"/communities/4545/members"}
              className="px-2 flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-900"
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
            <div className="mr-2 sm:mr-4">
              <Button radius="full" variant="bordered">
                Join
              </Button>
            </div>
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
