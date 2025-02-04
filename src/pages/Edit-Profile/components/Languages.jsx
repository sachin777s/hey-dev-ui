import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSuccess } from "../../../app/slices/user";
import toast from "react-hot-toast";
import API from "../../../api";

const Languages = () => {
  const spokenLanguages = useSelector(
    (state) => state.user.data.spokenLanguages
  );
  const [languageValue, setLanguageValue] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  //Handling add a new language
  const handleAddLanguage = (e) => {
    e.preventDefault();
    setLanguageValue((prev) =>
      prev
        .split(" ")
        .filter((word) => word !== "")
        .join(" ")
    );

    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/spoken-languages", {
          spokenLanguages: [...spokenLanguages, languageValue],
        });
        dispatch(fetchUserSuccess(response.data.data));
        setLanguageValue("");
      },
      {
        loading: "Adding Language..",
        success: "Language Addedd Successfully",
        error: "Failed to Add Language",
      }
    );
  };

  //Handling existing language
  const handleDeleteLanguage = (index) => {
    const languagesToBeUpdate = spokenLanguages.filter((_, i) => i !== index);
    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/spoken-languages", {
          spokenLanguages: languagesToBeUpdate,
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Deleting Language..",
        success: "Language Deleted Successfully",
        error: "Failed to Delete Language",
      }
    );
  };

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Spoken Languages</h1>
      <div className="mt-4 flex gap-2 flex-wrap items-center">
        {spokenLanguages.length === 0
          ? "No Language Available"
          : spokenLanguages.map((language, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center gap-2"
              >
                {language}
                <MdDeleteOutline
                  onClick={() => handleDeleteLanguage(i)}
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
