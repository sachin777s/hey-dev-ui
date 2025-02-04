import { Button, Input, Link } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdPhonelink } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { URL_REGEX } from "../../../utils/contants";
import toast from "react-hot-toast";
import API from "../../../api";
import { fetchUserSuccess } from "../../../app/slices/user";
const Projects = () => {
  const user = useSelector((state) => state.user.data);
  const [title, setTitle] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [hostUrl, setHostUrl] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (title.length > 50) {
      toast.error("Title must be under 50 characters");
    }
    if (!hostUrl || !URL_REGEX.test(hostUrl)) {
      toast.error("Host URL is missing or invalid");
    }
    if (!gitUrl || !URL_REGEX.test(gitUrl)) {
      toast.error("Github URL is missing or invalid");
    }

    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/projects", {
          projects: [...user.projects, { title, hostUrl, gitUrl }],
        });
        dispatch(fetchUserSuccess(response.data.data));
        setGitUrl("");
        setHostUrl("");
        setTitle("");
      },
      {
        loading: "Adding Project",
        success: "Project Added Successfully",
        error: "Project Deleted Successfully",
      }
    );
  };

  //Handling delete exiting project
  const handleDeleteProject = (index) => {
    const projectsToUpdate = user.projects.filter((project, i) => index !== i);
    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/projects", {
          projects: projectsToUpdate,
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Deleting Project",
        success: "Project Deleted Successfully",
        error: "Failed to delete project",
      }
    );
  };

  return (
    <div className="mt-16 flex flex-col items-start">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-4 flex flex-col">
        {user.projects.length === 0
          ? "No Project"
          : user.projects.map((project, i) => (
              <div className="border-b py-4">
                <h3 className="font-semibold">{project.title}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <a
                    href={project.gitUrl}
                    target="_black"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <FaGithub size={22} />
                      Source Code
                    </Button>
                  </a>
                  <a
                    href={project.gitUrl}
                    target="_black"
                    rel="noopener noreferrer"
                  >
                    <Button>
                      <MdPhonelink size={22} />
                      View Live
                    </Button>
                  </a>
                  <MdDeleteOutline
                    onClick={() => handleDeleteProject(i)}
                    color="red"
                    size={22}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
      </div>
      <Button
        onClick={() => setIsFormVisible(true)}
        className="mt-2"
        isIconOnly
        radius="full"
      >
        <IoAddOutline size={20} />
      </Button>
      {isFormVisible && (
        <Form
          onSubmit={handleSubmitForm}
          validationBehavior="native"
          className="mt-4 w-full flex flex-col gap-6"
        >
          <Input
            required
            label="Project Title"
            labelPlacement="outside"
            placeholder="Enter Project Title..."
            type="text"
            maxLength={50}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            required
            label="Github URL"
            labelPlacement="outside"
            placeholder="Enter github URL..."
            type="url"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
          />
          <Input
            required
            label="Host URL"
            labelPlacement="outside"
            placeholder="Enter host URL..."
            type="url"
            value={hostUrl}
            onChange={(e) => setHostUrl(e.target.value)}
          />
          <Button
            radius="full"
            type="submit"
            className="bg-[var(--main-color)] text-black"
          >
            Add
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Projects;
