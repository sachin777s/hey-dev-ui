import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const Languages = () => {
  const [languageValue, setLanguageValue] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  //Handling add a new language
  const handleAddLanguage = (e) => {
    e.preventDefault();
  };

  //Handling existing language
  const handleDeleteLanguage = () => {};

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Spoken Languages</h1>
      <div className="mt-4 flex gap-2 flex-wrap items-center">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
            >
              {"Hindi"}
              <MdDeleteOutline
                onClick={handleDeleteLanguage}
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
        <Form
          onSubmit={handleAddLanguage}
          validationBehavior="native"
          className="mt-4 flex flex-col items-start gap-2"
        >
          <Input
            required
            labelPlacement="outside"
            placeholder="Enter New Language..."
            type="text"
            value={languageValue}
            onChange={(e) => setLanguageValue(e.target.value)}
          />
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
};

export default Languages;
