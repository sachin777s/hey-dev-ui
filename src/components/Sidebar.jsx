import React, { useEffect, useRef, useState } from "react";
import Logo from "../assets/heydev192x192.png";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbUsers } from "react-icons/tb";
import { CgOrganisation } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Button, User } from "@nextui-org/react";

const Sidebar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const links = [
    // {
    //   label: "Profile",
    //   icon: <CgProfile size={22} />,
    //   route: "/profile",
    // },
    {
      label: "Home",
      icon: <IoHomeOutline />,
      route: "/",
    },
    {
      label: "Explore",
      icon: <IoSearch />,
      route: "/explore",
    },
    {
      label: "Notifications",
      icon: <MdOutlineNotificationsActive size={22} />,
      route: "/notifications",
    },
    {
      label: "Messages",
      icon: <FaRegMessage size={16} />,
      route: "/messages",
    },
    {
      label: "Communities",
      icon: <TbUsers size={18} />,
      route: "/communities",
    },
    {
      label: "Jobs",
      icon: <IoBagOutline />,
      route: "/jobs",
    },
    {
      label: "Company",
      icon: <CgOrganisation />,
      route: "/company",
    },
    {
      label: "Settings",
      icon: <IoSettingsOutline />,
      route: "/settings",
    },
  ];

  // Removing company section if it doesn't exists
  useEffect(() => {
    if (false) {
      links.splice(6, 1);
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsNavbarOpen(false);
        console.log(menuRef.current);
      }
    };

    // Add the event listener
    document.addEventListener("mousedown", handler);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className={`py-4 px-2 w-1/2 sm:w-[20%] min-w-[14rem] h-screen sm:min-h-screen bg-white dark:bg-black border-x-[0.5px] border-color flex flex-col items-start sm:items-end xl:items-start fixed top-0 transition-all duration-300 ${
        isNavbarOpen ? "left-0" : "-left-full"
      } sm:sticky shadow-md shadow-slate-400 sm:shadow-none z-10`}
    >
      <Avatar
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        className="z-50 fixed top-3 left-2 h-10 w-10 block sm:hidden"
        // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
      />

      <ul className="pt-12 sm:pt-0 flex flex-col items-start">
        <NavLink className="justify-self-start hidden sm:block">
          <img className="w-[32px] xl:w-[72px]" src={Logo} alt="" />
        </NavLink>

        <User
          className="mt-4 py-2 px-4 flex sm:hidden xl:flex border border-color  rounded-full font-mediumc cursor-pointer"
          name="Sachin Kumar"
          description="@sachin777sk"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          }}
          onClick={() => navigate("/profile")}
        />

        <Avatar
          className="mt-4 hidden sm:block xl:hidden"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          onClick={() => navigate("/profile")}
        />

        {links.map((item, i) => {
          return (
            <li key={i}>
              <Button
                onClick={() => setIsNavbarOpen(false)}
                variant="light"
                isIconOnly
                size="lg"
                className="px-2 w-full py-4 flex xl:hidden"
              >
                <NavLink
                  to={item.route}
                  className={
                    "flex items-center justify-start gap-2 text-xl py-2"
                  }
                >
                  {item.icon}
                  <span className="block sm:hidden xl:block">{item.label}</span>
                </NavLink>
              </Button>

              <Button
                onClick={() => setIsNavbarOpen(false)}
                variant="light"
                size="lg"
                className="py-4 hidden xl:flex"
              >
                <NavLink
                  to={item.route}
                  className={
                    "flex items-center justify-start gap-2 text-xl py-2"
                  }
                >
                  {item.icon}
                  <span className="hidden xl:block">{item.label}</span>
                </NavLink>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
