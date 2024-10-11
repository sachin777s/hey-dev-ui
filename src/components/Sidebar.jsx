import React from 'react'
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
import { NavLink } from 'react-router-dom';
import { Button } from '@nextui-org/react';




const Sidebar = () => {

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
            label: "Message",
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
            icon: < CgProfile/>,
            route: "/profile"
        }
    ]

    return (
        <div className='col-span-2 border-l-1'>
            <img width={52} src={Logo} alt="" />

            <ul>
                {
                    links.map((item) => {
                        return (
                            <li>
                                <NavLink to={item.route}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>

                            </li>
                        )
                    })
                }
            </ul>
            <Button color='primary'>Post</Button>
        </div>
    )
}

export default Sidebar