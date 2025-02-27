import React, { useEffect, useState } from "react";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import CreateJobModal from "./CreateJobModal";
import EditJob from "./EditJob";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../api";
import { addJobs } from "../../../app/slices/company";

function JobsPage() {
  const company = useSelector((state) => state.company.data);
  const jobs = useSelector((state) => state.company.jobs);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
    <div className="px-2 sm:px-4 pb-12">
      <div className="flex flex-col gap-4">
        {jobs.map((job, i) => (
          <EditJob currentJob={job} key={i} />
        ))}
      </div>
      {jobs.length === 0 && !isLoading && <div className="py-4">No Job</div>}
      {isLoading && (
        <div className="py-4">
          <Spinner color="success" />
        </div>
      )}
      <Button
        onPress={onOpen}
        radius="full"
        className="mt-4 bg-[var(--main-color)] text-black"
      >
        Add New Job
      </Button>
      <CreateJobModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </div>
  );
}

export default JobsPage;
