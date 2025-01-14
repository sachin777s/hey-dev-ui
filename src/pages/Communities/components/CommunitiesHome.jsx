import React from "react";
import SinglePost from "../../../components/SinglePost";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

const CommunitiesHome = () => {
  return (
    <>
      <div className="py-4 flex items-center justify-center flex-wrap gap-2">
        {Array(11)
          .fill(0)
          .map((_, i) => (
            <Link
            key={i}
              to={"/communities/78778"}
              className="p-2 flex items-center flex-col gap-2 border border-transparent hover:border-[#c4c4c4] hover:dark:border-[#222222] box-content rounded-2xl"
            >
              <div className="h-32 w-32 rounded-2xl bg-gray-300 overflow-hidden">
                <img
                  className=" h-full object-cover"
                  src="https://pbs.twimg.com/community_banner_img/1579498877941649408/ib8y5Ccy?format=jpg&name=360x360"
                  alt=""
                />
              </div>
              <div className="flex flex-col text-center">
                <span className="font-semibold hover:underline">React/ Next JS Devs</span>
                <span className="">
                  <span className="font-semibold">{"2.6K"}</span>
                  <span className="opacity-70"> Members</span>
                </span>
              </div>
            </Link>
          ))}
      </div>
      <div className="border-t-[0.5px] border-color">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div className="mt-2 px-2 sm:px-4">
              <Link
                to={"/communities/543534"}
                className="flex items-center gap-4 hover:underline opacity-70 font-bold"
              >
                <FaUserFriends />
                {"React js fans"}
              </Link>
              <SinglePost key={i} />
            </div>
          ))}
      </div>
    </>
  );
};

export default CommunitiesHome;
