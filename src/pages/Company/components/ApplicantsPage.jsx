import { Button, Spinner, User } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobs } from "../../../app/slices/company";
import API from "../../../api";

function ApplicantsPage() {
  const jobs = useSelector((state) => state.company.jobs);
  const [isOpen, setIsOpen] = useState({
    index: null,
    isOpen: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (jobs.length > 0) {
      return;
    }
    const fetchJobs = async () => {
      setIsLoading(true);
      const response = await API.get("/api/company/jobs");
      console.log(response.data);
      dispatch(addJobs(response.data.data));
      setIsLoading(false);
    };
    fetchJobs();
  }, []);

  return (
    <div className="px-2 sm:px-4 flex flex-col gap-4 pt-4">
      {jobs.map((job, i) => (
        <div key={i} className="px-4 py-2 rounded-xl border border-color">
          <div className="">
            <h1 className="text-xl font-semibold">{job.role}</h1>
            <Button
              className="mt-2"
              onClick={() => setIsOpen({ index: i, isOpen: !isOpen.isOpen })}
            >
              {isOpen.index === i && isOpen.isOpen
                ? "Hide Applicants"
                : "See Applicants"}
            </Button>
          </div>
          {isOpen.index === i && isOpen.isOpen && (
            <div className="mt-4 flex flex-col gap-2">
              {job.applicants.map((applicant, i) => (
                <div className="p-2 rounded-lg border border-color flex items-center justify-between">
                  <User
                    avatarProps={{
                      src: applicant.profilePicture,
                    }}
                    name={applicant.fullName}
                    description={"@"+applicant.username}
                  />

                  <div className="flex items-center gap-2">
                    <Button
                      variant="bordered"
                      className="border-[var(--main-color)] text-[var(--main-color)]"
                      onClick={() =>
                        window.open(applicant.resume, "_blank")
                      }
                    >
                      View Resume
                    </Button>
                    <Button
                      variant="bordered"
                      className="border-[var(--main-color)] text-[var(--main-color)]"
                      onClick={() =>
                        window.open(`mailto:${applicant.email}`, "_blank")
                      }
                    >
                      Mail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="py-4 flex items-center justify-center">
          <Spinner color="success" />
        </div>
      )}
    </div>
  );
}

export default ApplicantsPage;
