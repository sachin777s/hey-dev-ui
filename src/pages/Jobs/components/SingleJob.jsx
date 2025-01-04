import { Button } from "@nextui-org/react";
import React from "react";
import { CiMoneyBill } from "react-icons/ci";
import { GiBackwardTime } from "react-icons/gi";
import {
  IoBagRemoveOutline,
  IoHomeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { MdOutlineTimerOff } from "react-icons/md";

const SingleJob = () => {
  return (
    <div className="px-2 sm:px-4 pt-4">
      <div className="">
        <div className="flex items-center gap-2">
          <img
            className="max-w-16 max-h-16"
            src="https://internshala-uploads.internshala.com/logo%2Fiw0rlu96652-16704.png.webp"
            alt="..."
          />
          <div>
            <h1 className="text-2xl font-semibold">Front End Developer</h1>
            <h3 className="text-lg opacity-70">Athmick Private Limited</h3>
          </div>
        </div>
        <span className="mt-4 flex items-center gap-1">
          <IoHomeOutline size={22} className="opacity-70" />
          {"Work From Home"}
        </span>
        <div className="mt-4 flex items-start md:items-center gap-4 flex-col md:flex-row">
          <span className="flex items-center gap-1">
            <IoBagRemoveOutline size={22} className="opacity-70" />
            {"2"} Years Experience
          </span>
          <span className="flex items-center gap-1">
            <CiMoneyBill size={22} className="opacity-70" />
            {"300000"}$ - {"500000"}$
          </span>
          <span className="flex items-center gap-1">
            <MdOutlineTimerOff size={22} className="opacity-70" />
            Apply By {"2 May"}
          </span>
        </div>
        <span className="mt-4 flex items-center gap-1">
          <IoLocationOutline size={22} className="opacity-70" />
          {"Banglore"}
        </span>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1 text-[green]">
            <GiBackwardTime size={22} className="opacity-70" />
            {"1 Day"} ago
          </span>
          <Button radius="full" className="bg-[var(--main-color)] text-black">
            Apply Now
          </Button>
        </div>
        <div className="mt-4">
          {/* Skills Section */}
          <div>
            <h3 className="text-xl font-semibold">Required Skills</h3>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800">
                    {"React js"}
                  </span>
                ))}
            </div>
          </div>
          {/* Description Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Description:</h3>
            <p>
              {
                "Despite their contributions, the relationship is not without challenges.Despite their contributions, the relationship between cows and humans is not without challenges.Despite their contributions, the relationship between cows and humans is not without challenges.Despite their , the relationship between cows and humans is not without challenges.Despite their contributions, the relationship between cows and humans is not without challenges.Despite their contributions, the relationship between  and humans is not without challenges.Despite their contributions, the relationship between cows and humans is not without challenges."
              }
            </p>
          </div>
          {/* Key Responsibilities Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Key Responsibilities:</h3>
            <ol style={{ listStyle: "inside", listStyleType: "number" }}>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <li>
                    {
                      " Design, develop, and maintain scalable backend systems using Python, Node.js, and other relevant"
                    }
                  </li>
                ))}
            </ol>
          </div>
          {/* Openings Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Number Of Openings:</h3>
            <span>{"12"}</span>
          </div>
          {/* Organization About Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">
              About {"Athmick Private Limited"}:
            </h3>
            <p>
              {
                "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus eos odit iusto consequatur natus voluptatibus soluta ipsam, placeat sint. Accusamus enim neque voluptatibus, cum harum velit ab impedit modi corrupti, sint sapiente corporis placeat voluptate recusandae reiciendis architecto accusantium. Ea nulla quas magnam, blanditiis pariatur vero facilis consectetur ipsam quae!"
              }
            </p>
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default SingleJob;
