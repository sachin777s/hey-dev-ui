import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { URL_REGEX } from "../../../utils/contants";
import toast from "react-hot-toast";
import API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSuccess } from "../../../app/slices/user";

function Website() {
  const websiteUrl = useSelector((state) => state.user.data.website);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  // Handling website URL update
  const handleUpdateWebsite = (e) => {
    e.preventDefault();
    if (value.length > 0 && !URL_REGEX.test(value)) {
      return toast.error("Invalid URL");
    }
    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/website", {
          website: value,
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Website URL is Update",
        success: "Website URL is updated successfully",
        error: "Failed to update Website URL",
      }
    );
  };

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Website</h1>
      <Form
        onSubmit={handleUpdateWebsite}
        validationBehavior="native"
        className="mt-4"
      >
        <Input
          placeholder="Enter your website URL..."
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          type="submit"
          className="mt-6 bg-[var(--main-color)] text-black"
        >
          Save
        </Button>
      </Form>
    </div>
  );
}

export default Website;
