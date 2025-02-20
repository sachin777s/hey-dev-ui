import { User } from "@nextui-org/react";
import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AboutCommunity() {
  const community = useSelector((state) => state.community.data);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  return (
    <div className="px-2 sm:px-4 pb-12">
      <div>
        <h1 className="text-xl font-semibold">Description</h1>
        <p className="mt-2">{community?.description}</p>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Rules</h1>
        <ul className="mt-2" itemType="circle">
          {community?.rules?.map((rule, i) => (
            <li key={i} className="flex items-start gap-1">
              <FaHandPointRight size={22} />
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Created Date</h1>
        <span className="mt-2b block">{formatDate(community?.createdAt)}</span>
      </div>

      <div className="mt-8">
        <h1 className="text-xl font-semibold">Created By</h1>
        <User
          className="mt-2 border border-color p-2 rounded-full"
          avatarProps={{
            src: community?.creator?.profilePicture,
          }}
          description={
            <Link isExternal href="https://x.com/jrgarciadev" size="sm">
              @{community?.creator?.username}
            </Link>
          }
          name={community?.creator?.fullName}
        />
      </div>
    </div>
  );
}

export default AboutCommunity;
