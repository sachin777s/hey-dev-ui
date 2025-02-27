import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { CiMoneyBill } from "react-icons/ci";
import { GiBackwardTime } from "react-icons/gi";
import {
  IoBagRemoveOutline,
  IoHomeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineTimerOff } from "react-icons/md";
import { useParams } from "react-router-dom";
import API from "../../../api";
import { timeAgo } from "../../../utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const SingleJob = () => {
  const userId = useSelector((state) => state.user.data._id);
  const [job, setJob] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { jobId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      const response = await API.get(`/api/job/${jobId}`);
      setJob(response.data.data);
      setIsLoading(false);
    };
    fetchJob();
  }, []);

  const handleApplyInJob = () => {
    toast.promise(
      async () => {
        const response = await API.put(`/api/job/${jobId}/apply`);
        console.log(response.data);
        setJob(response.data.data);
      },
      {
        loading: "Applying in job",
        success: "Applied Successfully",
        error: "Failed to Apply",
      }
    );
  };

  return (
    <div className="px-2 sm:px-4 pt-4">
      {isLoading ? (
        <div className="py-4 flex items-center justify-center">
          <Spinner color="success" />
        </div>
      ) : (
        <div className="">
          <div className="flex items-center gap-2">
            {job?.company?.logo ? (
              <img
                className="max-w-16 max-h-16 rounded-md"
                src={job?.company?.logo}
                alt="..."
              />
            ) : (
              <CgOrganisation size={38} />
            )}
            <div>
              <h1 className="text-2xl font-semibold">{job?.role}</h1>
              <h3 className="text-lg opacity-70">{job?.company?.name}</h3>
            </div>
          </div>
          <span className="mt-4 flex items-center gap-1">
            <IoHomeOutline size={22} className="opacity-70" />
            {job?.locationType === "Remote"
              ? "Work From Home"
              : job?.locationType === "Office"
              ? "In Office"
              : "Hybrid"}
          </span>
          <div className="mt-4 flex items-start md:items-center gap-4 flex-col md:flex-row">
            <span className="flex items-center gap-1">
              <IoBagRemoveOutline size={22} className="opacity-70" />
              {job?.experienceInYear} Years Experience
            </span>
            <span className="flex items-center gap-1">
              <CiMoneyBill size={22} className="opacity-70" />
              {job?.salary?.minRange} LPA - {job?.salary?.maxRange}LPA
            </span>
            <span className="flex items-center gap-1">
              <MdOutlineTimerOff size={22} className="opacity-70" />
              Apply By {job?.deadline}
            </span>
          </div>
          <span className="mt-4 flex items-center gap-1">
            <IoLocationOutline size={22} className="opacity-70" />
            {"Banglore"}
          </span>
          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[green]">
              <GiBackwardTime size={22} className="opacity-70" />
              {timeAgo(job?.createdAt)} ago
            </span>
            <Button
              onClick={handleApplyInJob}
              disabled={job?.applicants?.includes(userId)}
              radius="full"
              variant={job?.applicants?.includes(userId) ? "bordered" : "flat"}
              className={`${
                job?.applicants?.includes(userId)
                  ? "text-[var(--main-color)] border-[var(--main-color)]"
                  : "bg-[var(--main-color)] text-black"
              }`}
            >
              {job?.applicants?.includes(userId) ? "Applied" : "Apply Now"}
            </Button>
          </div>
          <div className="mt-4">
            {/* Skills Section */}
            <div>
              <h3 className="text-xl font-semibold">Required Skills</h3>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                {job?.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Description Section */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Description:</h3>
              <p>{job?.description}</p>
            </div>
            {/* Openings Section */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">Number Of Openings:</h3>
              <span>{job?.openings}</span>
            </div>
            {/* Organization About Section */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">
                About {job?.company?.name}:
              </h3>
              <p>{job?.company?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleJob;
