import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../api";
import { fetchUserSuccess } from "../../../app/slices/user";

const Skills = () => {
  const user = useSelector((state) => state.user.data);
  const [skillValue, setSkillValue] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  const dispatch = useDispatch();

  //Handling add a new skill
  const handleAddSkill = () => {
    setSkillValue((prev) =>
      prev
        .split(" ")
        .filter((word) => word !== "")
        .join(" ")
    );

    if (!skillValue) {
      toast.error("Skill input is empty");
    }

    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/skills", {
          skills: [...user.skills, skillValue],
        });
        dispatch(fetchUserSuccess(response.data.data));
        setSkillValue("");
      },
      {
        loading: "Adding Skill..",
        success: "Skill Addedd Successfully",
        error: "Failed to Add Skill",
      }
    );
  };

  //Handling delete existing skill
  const handleDeleteSkill = (index) => {
    const skillsToUpdate = user.skills.filter((skill, i) => i !== index);
    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/skills", {
          skills: skillsToUpdate,
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Deleting Skill..",
        success: "Skill Deleted Successfully",
        error: "Failed to Delete Skill",
      }
    );
  };
  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Skills</h1>
      <div className="mt-4 flex gap-2 flex-wrap items-center">
        {user.skills.length === 0
          ? "No Skill"
          : user.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
              >
                {skill}
                <MdDeleteOutline
                  onClick={() => handleDeleteSkill(i)}
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
          <Button
            onClick={handleAddSkill}
            radius="full"
            className="bg-[var(--main-color)] text-black"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};

export default Skills;
