import { Form } from "@nextui-org/form";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { addCreatedJob } from "../../../app/slices/company";

function CreateJobModal({ isOpen, onOpenChange, onClose }) {
  const company = useSelector((state) => state.company.data);
  const [job, setJob] = useState({
    role: "",
    description: "",
    skills: [],
    experienceInYear: 0,
    salary: {
      minRange: 0,
      maxRange: 0,
    },
    locationType: "Office",
    location: "",
    deadline: "",
    openings: 0,
  });

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
    const [year, month, day] = job.deadline.split("-");
    const deadline = `${day}/${month}/${year}`;

    toast.promise(
      async () => {
        const response = await API.post("/api/job", {
          ...job,
          company: company._id,
          deadline,
        });
        console.log(response.job);
        dispatch(addCreatedJob(response.data.data));
        setJob({
          role: "",
          description: "",
          skills: [],
          experienceInYear: 0,
          salary: {
            minRange: 0,
            maxRange: 0,
          },
          locationType: "Office",
          location: "",
          deadline: "",
          openings: 0,
        });
        onClose();
      },
      {
        loading: "Creating Job",
        success: "Job Created Successfully",
        error: "Failed to Create Job",
      }
    );
  };

  return (
    <Modal
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-white dark:bg-black border border-color"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Create New Job</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={submitHandler}
                validationBehavior="native"
                className="p-4 flex flex-col gap-6 border border-color rounded-lg text-white"
              >
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
                  value={job.description}
                  onChange={handleInputChange}
                  maxLength={2000}
                />

                <Input
                  required
                  label="Skills (Separate by commas)"
                  labelPlacement="outside"
                  placeholder="Separate skills by comma(,)..."
                  type="text"
                  name="role"
                  onChange={(e) =>
                    setJob((prev) => {
                      return {
                        ...prev,
                        skills: e.target.value
                          .replaceAll(/\s+/g, " ")
                          .split(","),
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
                      placeholder="Minimum (LPA)"
                      value={job.salary.minRange}
                      onChange={(e) =>
                        setJob((prev) => {
                          return {
                            ...job,
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
                      placeholder="Maximum (LPA)"
                      value={job.salary.maxRange}
                      onChange={(e) =>
                        setJob((prev) => {
                          return {
                            ...job,
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
                  <span className="text-sm">Location Type</span>
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
                    label="Location"
                    labelPlacement="outside"
                    placeholder="Enter Location..."
                    type="text"
                    name="location"
                    value={job.location}
                    onChange={handleInputChange}
                  />
                )}

                <div className="flex flex-col gap-1">
                  <span className="text-sm">Deadline</span>
                  <input
                    type="date"
                    className="px-4 py-2 rounded-xl bg-[#EFEFEF] dark:bg-[#3F3F46]"
                    onChange={(e) =>
                      setJob((prev) => {
                        return { ...prev, deadline: e.target.value };
                      })
                    }
                  />
                </div>

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

                <Button
                  type="submit"
                  radius="full"
                  className="bg-[var(--main-color)] text-black"
                >
                  Create Job
                </Button>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CreateJobModal;
