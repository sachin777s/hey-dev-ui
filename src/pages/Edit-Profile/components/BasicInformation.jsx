import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import toast from "react-hot-toast";
import API from "../../../api";
import { fetchUserSuccess } from "../../../app/slices/user";
import { useDispatch, useSelector } from "react-redux";

function BasicInformation() {
  const user = useSelector((state)=>state.user.data)
  const [headline, setHeadline] = useState(user.headline);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (headline.length > 100) {
      return toast.error("Headline must be under 100 characters");
    }
    if (about.length > 500) {
      return toast.error("Description must be under 500 characters");
    }

    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/about-information", {
          about,
          headline,
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Updating",
        success: "Updated Successfully",
        error: "Failed to update",
      }
    );
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold">About</h1>
      <Form
        validationBehavior="native"
        onSubmit={submitHandler}
        className="mt-4 w-full flex flex-col gap-8"
      >
        <Input
          label="Headline"
          labelPlacement="outside"
          name="headline"
          placeholder="Type headline.."
          type="text"
          onChange={(e) => setHeadline(e.target.value)}
          value={headline}
          maxLength={100}
        />
        <Textarea
          defaultValue={""}
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description..."
          onChange={(e) => setAbout(e.target.value)}
          value={about}
          maxLength={500}
        />
        <Button
          radius="full"
          type="submit"
          className="bg-[var(--main-color)] text-black"
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

export default BasicInformation;
