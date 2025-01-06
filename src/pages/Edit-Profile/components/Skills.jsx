import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const Skills = () => {
  const [skillValue, setSkillValue] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  //Handling add a new skill
  const handleAddSkill = () => {};

  //Handling delete existing skill
  const handleDeleteSkill = () => {};
  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Skills</h1>
      <div className="mt-4 flex gap-2 flex-wrap items-center">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
            >
              {"React js"}
              <MdDeleteOutline
                onClick={handleDeleteSkill}
                className="cursor-pointer"
                color="red"
              />
            </span>
          ))}
        <Button onClick={() => setIsFormVisible(true)} isIconOnly radius="full">
          <IoAddOutline size={20} />
        </Button>
      </div>
      {isFormVisible && (
        <div className="mt-4 flex flex-col items-start gap-2">
          <Input
            required
            labelPlacement="outside"
            placeholder="Enter New Skill..."
            type="text"
            value={skillValue}
            onChange={(e) => setSkillValue(e.target.value)}
          />
          <Button radius="full" className="bg-[var(--main-color)] text-black">
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default Skills;
