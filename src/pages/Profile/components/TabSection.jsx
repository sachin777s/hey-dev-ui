import React, { useEffect } from "react";
import { FaHeart, FaReply } from "react-icons/fa";
import { MdArticle } from "react-icons/md";
import { PiIdentificationCardFill } from "react-icons/pi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const TabSection = () => {

  

  const links = [
    {
      label: "Posts",
      path: "/profile/posts",
      icon: <MdArticle />,
    },
    {
      label: "Replies",
      path: "/profile/replies",
      icon: <FaReply />,
    },
    {
      label: "Liked",
      path: "/profile/likes",
      icon: <FaHeart />,
    },
    {
      label: "About",
      path: "/profile/about",
      icon: <PiIdentificationCardFill />,
    },
  ];

  return (
    <section>
      <div className="mt-8 p-1 grid grid-cols-4 gap-2 bg-[#D4D4D8] dark:bg-[#3F3F46]">
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
      <Outlet />
    </section>
  );
};

export default TabSection;
