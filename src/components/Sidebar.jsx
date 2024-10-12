import React, { useEffect, useRef, useState } from 'react'
import Logo from "../assets/heydev192x192.png"
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { TbUsers } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { Avatar, Button, User } from '@nextui-org/react';
import { FaPlus } from "react-icons/fa";

const Sidebar = () => {

    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const menuRef = useRef(null);

    const links = [
        {
            label: "Home",
            icon: <IoHomeOutline />,
            route: "/"
        },
        {
            label: "Explore",
            icon: <IoSearch />,
            route: "/explore"
        },
        {
            label: "Notifications",
            icon: <MdOutlineNotificationsActive />,
            route: "/notifications"
        },
        {
            label: "Messages",
            icon: <FaRegMessage />,
            route: "/messages"
        },
        {
            label: "Communities",
            icon: <TbUsers />,
            route: "/communities"
        },
        {
            label: "Hackathons",
            icon: <MdOutlineEmojiEvents />,
            route: "/hackathons"
        },
        {
            label: "Jobs",
            icon: <IoBagOutline />,
            route: "/jobs"
        },
        {
            label: "Organizations",
            icon: <CgOrganisation />,
            route: "/organizations"
        },
        {
            label: "Profile",
            icon: < CgProfile />,
            route: "/profile"
        },
        {
            label: "Settings",
            icon: <IoSettingsOutline />,
            route: "/settings"
        }
    ]

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsNavbarOpen(false);
                console.log(menuRef.current)
            }
            document.addEventListener("mousedown", handler);
            return () => document.removeEventListener("mousedown", handler);
        }
    }, [])

    return (
        <div
            ref={menuRef}
            className={`py-4 px-2 w-1/2 sm:w-[20%] h-screen sm:h-auto border-l-1 flex flex-col items-start sm:items-end xl:items-start fixed top-0 transition-all duration-250 ${isNavbarOpen ? "left-0" : "-left-full"} sm:static bg-slate-50 shadow-xl shadow-slate-400 sm:shadow-none z-10`}
        >

            <Avatar
                onClick={() => setIsNavbarOpen(!isNavbarOpen)}
                className='z-50 fixed top-2 left-2 h-10 w-10 block sm:hidden'
            // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />

            <ul className='pt-12 sm:pt-0 flex flex-col items-start'>
                <NavLink className='justify-self-start hidden sm:block'>
                    <img
                        className='w-[32px] xl:w-[72px]'
                        src={Logo}
                        alt=""
                    />
                </NavLink>

                {
                    links.map((item, i) => {
                        return (
                            <li key={i}>
                                <Button
                                    onClick={() => setIsNavbarOpen(false)}
                                    variant='light'
                                    isIconOnly
                                    size='lg'
                                    className='px-2 w-full py-4 flex xl:hidden'
                                >
                                    <NavLink
                                        to={item.route}
                                        className={"flex items-center justify-start gap-2 text-xl py-2"}
                                    >
                                        {item.icon}
                                        <span className='block sm:hidden xl:block'>{item.label}</span>
                                    </NavLink>
                                </Button>

                                <Button
                                    onClick={() => setIsNavbarOpen(false)}
                                    variant='light'
                                    size='lg'
                                    className='py-4 hidden xl:flex'
                                >
                                    <NavLink
                                        to={item.route}
                                        className={"flex items-center justify-start gap-2 text-xl py-2"}
                                    >
                                        {item.icon}
                                        <span className='hidden xl:block'>{item.label}</span>
                                    </NavLink>
                                </Button>

                            </li>
                        )
                    })
                }
            </ul>

            <Button
                color='primary'
                radius='full'
                size='lg'
                className='mt-4 w-full max-w-[200px] block sm:hidden xl:block'
            >
                Post
            </Button>
            <Button
                color='primary'
                radius='full'
                size='lg'
                isIconOnly
                className='mt-4 hidden sm:flex xl:hidden items-center justify-center'
            >
                <FaPlus color='white' />
            </Button>

            <User
                className='mt-4 py-2 px-4 flex sm:hidden xl:flex hover:bg-gray-200  rounded-full font-medium'
                name="Sachin Kumar"
                description="Product Designer"
                avatarProps={{
                    // src: "https://i.pravatar.cc/150?u=a04258114e29026702d"?
                }}
            />
            <Avatar
                className='mt-4 hidden sm:block xl:hidden'
            // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
        </div>
    )
}

export default Sidebar;