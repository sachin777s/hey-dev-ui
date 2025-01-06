import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

function Education() {
  const [education, setEducation] = useState({
    collegeName: "",
    course: "",
    completedIn: "",
  });
  const [isFormVisible, setisFormVisible] = useState(false);

  const handleInputChange = (e) => {
    setEducation((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(education);
  };

  //Deleting Existing education
  const deleteEducation = () => {};

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Educational Information</h1>
      <div className="mt-4 flex flex-col items-start gap-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="px-4 py-2 bg-gray-200 dark:bg-[#3F3F46] rounded-2xl flex flex-col"
            >
              <h3 className="text-lg font-semibold">
                IFTM University, Modaradabad
              </h3>
              <div className="border-l-2 border-gray-600 dark:border-gray-400 flex flex-col pl-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <span>B.Tech CSE</span>
                <span>
                  Completed in <span className="font-semibold">2025</span>
                </span>
              </div>
              <Button
                size="sm"
                variant="bordered"
                className="mt-2 w-full border-[red] text-[red]"
                onClick={deleteEducation}
              >
                <MdDeleteOutline size={18} />
              </Button>
            </div>
          ))}
      </div>
      <Button onClick={() => setisFormVisible(true)} className="mt-4">
        Add New
      </Button>
      {isFormVisible && (
        <Form
          validationBehavior="native"
          onSubmit={submitHandler}
          className="mt-4 flex flex-col gap-6"
        >
          <Input
            required
            label="College Name"
            labelPlacement="outside"
            name="collegeName"
            placeholder="Enter your college name..."
            type="text"
            value={education.collegeName}
            onChange={handleInputChange}
          />
          <Input
            required
            label="Course"
            labelPlacement="outside"
            name="course"
            placeholder="Enter your course..."
            type="text"
            value={education.course}
            onChange={handleInputChange}
          />
          <div className="flex flex-col gap-1">
            <span>Completed In</span>
            <select
              required
              name="completedIn"
              className="px-8 py-2 rounded-xl outline-none dark:bg-[#3F3F46]"
              defaultValue={education.completedIn}
              onChange={handleInputChange}
            >
              {Array.from(
                { length: new Date().getFullYear() + 5 - 1950 + 1 },
                (_, i) => 1950 + i
              ).map((year, i) => (
                <option key={i}>{year}</option>
              ))}
            </select>
          </div>
          <Button
            type="submit"
            radius="full"
            className="bg-[var(--main-color)] text-black"
          >
            Add
          </Button>
        </Form>
      )}
    </div>
  );
}

export default Education;
