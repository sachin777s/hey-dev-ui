import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { URL_REGEX } from "../../../utils/contants";
import toast from "react-hot-toast";
import API from "../../../api";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserSuccess } from "../../../app/slices/user";

function SocialLinks() {
  const defaultLinks = useSelector((state) => state.user.data.socialLinks);
  const [socialLinks, setSocialLinks] = useState({
    github: defaultLinks.github,
    linkedin: defaultLinks.linkedin,
    twitter: defaultLinks.twitter,
    instagram: defaultLinks.instagram,
  });
  const dispatch = useDispatch();

  // Handling Input value changes
  const handleInputChange = (e) => {
    setSocialLinks((prev) => {
      return { ...socialLinks, [e.target.name]: e.target.value };
    });
  };

  // Submitting the form
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      (socialLinks.github && !URL_REGEX.test(socialLinks.github)) ||
      (socialLinks.linkedin && !URL_REGEX.test(socialLinks.linkedin)) ||
      (socialLinks.twitter && !URL_REGEX.test(socialLinks.twitter)) ||
      (socialLinks.instagram && !URL_REGEX.test(socialLinks.instagram))
    ) {
      return toast.error("Invalid URL");
    }

    toast.promise(
      async () => {
        const response = await API.put("/api/user/profile/social-links", {
          socialLinks,
        });
        dispatch(fetchUserSuccess(response.data.data));
      },
      {
        loading: "Updating Social Links",
        success: "Social Links Updated Successfully",
        error: "Failed to update social links",
      }
    );
  };

  return (
    <div className="mt-16">
      <h1 className="text-2xl font-semibold">Social Links</h1>
      <Form
        className="mt-4 flex flex-col gap-6"
        validationBehavior="native"
        onSubmit={submitHandler}
      >
        <Input
          label="Github"
          labelPlacement="outside"
          name="github"
          placeholder="Enter Github URL..."
          type="text"
          value={socialLinks.github}
          onChange={handleInputChange}
        />
        <Input
          label="Linkedin"
          labelPlacement="outside"
          name="linkedin"
          placeholder="Enter Linkedin URL..."
          type="text"
          value={socialLinks.linkedin}
          onChange={handleInputChange}
        />
        <Input
          label="Twitter"
          labelPlacement="outside"
          name="twitter"
          placeholder="Enter Twitter URL..."
          type="text"
          value={socialLinks.twitter}
          onChange={handleInputChange}
        />
        <Input
          label="Instagram"
          labelPlacement="outside"
          name="instagram"
          placeholder="Enter Instagram URL..."
          type="text"
          value={socialLinks.instagram}
          onChange={handleInputChange}
        />
        <Button
          radius="full"
          className="bg-[var(--main-color)] text-black"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </div>
  );
}

export default SocialLinks;
