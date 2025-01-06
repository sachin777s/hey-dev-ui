import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";

function SocialLinks() {
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  // Handling Input value changes
  const handleInputChange = (e) => {
    setSocialLinks((prev) => {
      return { ...socialLinks, [e.target.name]: e.target.value };
    });
  };

  // Submitting the form
  const submitHandler = (e) => {
    e.preventDefault();
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
          required
          label="Github"
          labelPlacement="outside"
          name="github"
          placeholder="Enter Github URL..."
          type="url"
          value={socialLinks.github}
          onChange={handleInputChange}
        />
        <Input
          label="Linkedin"
          labelPlacement="outside"
          name="linkedin"
          placeholder="Enter Linkedin URL..."
          type="url"
          value={socialLinks.linkedin}
          onChange={handleInputChange}
        />
        <Input
          label="Twitter"
          labelPlacement="outside"
          name="twitter"
          placeholder="Enter Twitter URL..."
          type="url"
          value={socialLinks.twitter}
          onChange={handleInputChange}
        />
        <Input
          label="Instagram"
          labelPlacement="outside"
          name="instagram"
          placeholder="Enter Instagram URL..."
          type="url"
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
