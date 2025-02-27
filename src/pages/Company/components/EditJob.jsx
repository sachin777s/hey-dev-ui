import { Form } from "@nextui-org/form";
import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { DATE_REGEX } from "../../../utils/contants";
import API from "../../../api";
import { useDispatch } from "react-redux";
import { deleteJob, updateJob } from "../../../app/slices/company";

function EditJob({ currentJob }) {
  const [job, setJob] = useState({
    role: currentJob.role,
    description: currentJob.description,
    skills: currentJob.skills.join(","),
    experienceInYear: currentJob.experienceInYear,
    salary: {
      minRange: currentJob.salary.minRange,
      maxRange: currentJob.salary.maxRange,
    },
    locationType: currentJob.locationType,
    location: currentJob.location,
    deadline: currentJob.deadline,
    openings: currentJob.openings,
  });
  const [isOpen, setisOpen] = useState(false);

  const dispatch = useDispatch();

  //Handling Input Change
  const handleInputChange = (e) => {
    setJob((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //Handling submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!DATE_REGEX.test(job.deadline)) {
      return toast.error("Invalid Deadline Format");
    }

    const skills = job.skills
      .split(",")
      .map((_) => _.trim())
      .join()
      .split(",");

    toast.promise(
      async () => {
        const response = await API.put(`/api/job/${currentJob._id}`, {
          ...job,
          skills,
        });
        console.log(response.data);
        dispatch(updateJob(response.data.data));
      },
      {
        loading: "Job is Updating",
        success: "Job Updated Successfully",
        error: "Failed to Update Job",
      }
    );
  };

  //Handling delete job
  const handleDeleteJob = () => {
    toast.promise(
      async () => {
        const response = await API.delete(`/api/job/${currentJob._id}`);
        console.log(response.data);
        dispatch(deleteJob(currentJob));
      },
      {
        loading: "Deleting Job",
        success: "Job Deleted Successfully",
        error: "Failed to Delete Job",
      }
    );
  };

  return (
    <div className="mt-4">
      <div
        onClick={() => setisOpen((prev) => !prev)}
        className="px-4 py-2 max-w-[360px] rounded-lg border border-color transition-all duration-300 hover:shadow-[0_0_12px_-3px] cursor-pointer"
      >
        <h1 className="text-xl font-semibold">{currentJob.role}</h1>
        <p>
          {currentJob.description.slice(0, 50)}
          ...
        </p>
      </div>
      {isOpen && (
        <div className="h-6 border-2 border-color w-0 translate-x-12"></div>
      )}
      {isOpen && (
        <Form
          onSubmit={submitHandler}
          validationBehavior="native"
          className="p-4 flex flex-col gap-6 border border-color rounded-lg relative"
        >
          <button
            onClick={() => setisOpen(false)}
            className="text-red-500 absolute right-2 sm:right-4 top-1"
          >
            See Less
          </button>
          <Input
            required
            label="Job Role"
            labelPlacement="outside"
            placeholder="Enter job role..."
            type="text"
            name="role"
            value={job.role}
            onChange={handleInputChange}
          />
          <Textarea
            required
            label="Job Description"
            labelPlacement="outside"
            name="description"
            maxLength={2000}
            value={job.description}
            onChange={handleInputChange}
          />

          <Input
            required
            label="Skills (Separate by commas)"
            labelPlacement="outside"
            placeholder="Separate skills by comma(,)..."
            type="text"
            name="role"
            value={job.skills}
            onChange={(e) =>
              setJob((prev) => {
                return {
                  ...prev,
                  skills: e.target.value,
                };
              })
            }
          />

          <Input
            required
            label="Minimum Experience (In Year)"
            labelPlacement="outside"
            placeholder="Enter minimum needed experience..."
            type="number"
            name="experienceInYear"
            min={0}
            value={job.experienceInYear}
            onChange={handleInputChange}
          />

          <div>
            <span className="text-sm">Salary</span>
            <div className="flex items-center gap-2">
              <Input
                required
                placeholder="Minimum Range..."
                type="number"
                value={job.salary.minRange}
                onChange={(e) =>
                  setJob((prev) => {
                    return {
                      ...prev,
                      salary: {
                        minRange: e.target.value,
                        maxRange: prev.salary.maxRange,
                      },
                    };
                  })
                }
                min={0}
              />
              <Input
                required
                placeholder="Maximum Salary..."
                type="number"
                value={job.salary.maxRange}
                onChange={(e) =>
                  setJob((prev) => {
                    return {
                      ...prev,
                      salary: {
                        minRange: prev.salary.minRange,
                        maxRange: e.target.value,
                      },
                    };
                  })
                }
                min={0}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span>Location Type</span>
            <select
              required
              name="locationType"
              className="px-8 py-2 rounded-xl outline-none dark:bg-[#3F3F46]"
              defaultValue={job.locationType}
              onChange={handleInputChange}
            >
              <option>Office</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {job.locationType !== "Remote" && (
            <Input
              required={job.locationType !== "Remote"}
              label="Locatoin"
              labelPlacement="outside"
              placeholder="Enter Location..."
              type="text"
              name="location"
              value={job.location}
              onChange={handleInputChange}
            />
          )}

          <Input
            required
            type="text"
            labelPlacement="outside"
            label="Deadline"
            placeholder="dd/mm/yyyy"
            value={job.deadline}
            onChange={(e) =>
              setJob((prev) => {
                return { ...prev, deadline: e.target.value };
              })
            }
          />

          <Input
            required
            label="Openings"
            labelPlacement="outside"
            placeholder="Enter Number of Openings..."
            type="text"
            name="openings"
            value={job.openings}
            onChange={handleInputChange}
          />

          <div className="flex items-center gap-2">
            <Button
              type="submit"
              radius="full"
              className="bg-[var(--main-color)] text-black"
            >
              Update
            </Button>
            <Button
              variant="bordered"
              radius="full"
              className="text-red-500 border-red-500"
              onClick={handleDeleteJob}
            >
              Delete Job
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default EditJob;
