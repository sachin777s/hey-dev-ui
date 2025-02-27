import React from "react";
import SearchJobs from "./SearchJobs";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdAccessTime, MdOutlinePeopleAlt } from "react-icons/md";
import { GiBackwardTime } from "react-icons/gi";
import { useSelector } from "react-redux";
import { timeAgo } from "../../../utils/timeAgo";
import { Spinner } from "@nextui-org/react";

const JobsHome = () => {
  const navigate = useNavigate();
  const { data, isLoading, hasMore } = useSelector((state) => state.jobs);

  return (
    <>
      <SearchJobs />
      <div className="px-2 sm:px-4">
        {data.map((job, i) => (
          <div
            key={i}
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="mt-4 p-2 block border-[0.5px] border-color rounded-2xl hover:shadow-[0_0_8px_-2px_gray] cursor-pointer"
          >
            <h3 className="text-xl font-semibold">{job.role}</h3>
            <p className="opacity-80 text-base">{job.company.name}</p>
            <div className="mt-2 flex items-center gap-2 opacity-60">
              <span className="flex items-center gap-1">
                <IoLocationOutline size={20} />
                <span className="text-sm">
                  {job.locationType === "Remote" ? "Remote" : job.location}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <RiMoneyRupeeCircleLine size={20} />
                <span className="text-sm">
                  {job.salary.minRange} LPA - {job.salary.maxRange} LPA
                </span>
              </span>
              <span></span>
            </div>
            <div className="mt-2 opacity-60 flex items-center gap-1">
              <GiBackwardTime size={20} />
              {timeAgo(job.createdAt)} ago
            </div>
            <div className="mt-2 opacity-60 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <MdAccessTime size={20} />
                <span className="text-sm">
                  {job.experienceInYear} Years Experience Required
                </span>
              </span>
              <span className="flex items-center gap-1">
                <MdOutlinePeopleAlt />
                {job.applicants.length} Applied
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="py-4 flex items-center justify-center">
            <Spinner color="success" />
          </div>
        )}
        {data.length === 0 && !isLoading && (
          <div className="w-full mt-4 flex items-center justify-center">
            Search or Filter Doesn't matched
          </div>
        )}
        {!hasMore && (
          <div className="py-4 flex items-center justify-center">
            No More Jobs
          </div>
        )}
      </div>
    </>
  );
};

export default JobsHome;
