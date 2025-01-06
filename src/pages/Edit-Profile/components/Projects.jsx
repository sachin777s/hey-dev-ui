import { Button, Input } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline, MdPhonelink } from "react-icons/md";

const Projects = () => {
  const [github, setGithub] = useState("");
  const [hostUrl, setHostUrl] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  //Handling delete exiting project
  const handleDeleteProject = () => {};

  return (
    <div className="mt-16 flex flex-col items-start">
      <h1 className="text-2xl font-semibold">Projects</h1>
      <div className="mt-4 flex flex-col">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div className="flex items-center gap-4 border-b py-4">
              <Button>
                <FaGithub size={22} />
                Source Code
              </Button>
              <Button>
                <MdPhonelink size={22} />
                View Live
              </Button>
              <MdDeleteOutline
                onClick={handleDeleteProject}
                color="red"
                size={22}
                className="cursor-pointer"
              />
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
          className="mt-4 flex flex-col gap-6"
        >
          <Input
            required
            label="Github URL"
            labelPlacement="outside"
            placeholder="Enter github URL..."
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
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
