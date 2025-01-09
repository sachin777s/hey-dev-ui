import React, { useState } from "react";
import { Form } from "@nextui-org/form";
import { Button, Input, Textarea } from "@nextui-org/react";
import UploadLogo from "./helpers/UploadLogo";

const StartCommunity = () => {
  const [community, setCommunity] = useState({
    name: "",
    headline: "",
    description: "",
    avatar: "",
    rules: [],
  });
  const [logoImage, setLogoImage] = useState();

  const handleInputChange = (e) => {
    setCommunity((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRulesInputChange = (event, index) => {
    let tempArr = community.rules;
    tempArr[index] = event.target.value;
    setCommunity((prev) => {
      return { ...prev, rules: tempArr };
    });
  };

  const filterRules = () => {
    const filteredRules = community.rules.filter((rule) => rule != "");
    setCommunity((prev) => {
      return { ...prev, rules: filteredRules };
    });
  };

  // Handling upload logo
  const uploadLogo = async () => {};

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    filterRules();
    await uploadLogo();
    console.log(community);
  };

  return (
    <section className="px-2 sm:px-4 pb-12">
      <h1 className="mt-4 text-2xl font-semibold">Create New Community</h1>
      <Form
        onSubmit={handleSubmitForm}
        validationBehavior="native"
        className="mt-4 flex flex-col items-start gap-6"
      >
        <Input
          required
          label="Community Name"
          labelPlacement="outside"
          placeholder="Enter community name..."
          type="text"
          name="name"
          value={community.name}
          onChange={handleInputChange}
        />

        <Input
          required
          label="Headline"
          labelPlacement="outside"
          placeholder="Enter headline (maximum 100 characters)"
          type="text"
          name="headline"
          value={community.headline}
          onChange={handleInputChange}
        />

        <Textarea
          required
          label="Description"
          labelPlacement="outside"
          placeholder="Write about community (maximum 500 characters allowed)"
          name="description"
          maxLength={500}
          value={community.description}
          onChange={handleInputChange}
        />

        <div>
          <span className="text-sm">Upload Community Logo</span>
          <UploadLogo setLogoImage={setLogoImage} />
        </div>

        <div className="w-full flex flex-col gap-2">
          <span className="text-sm">
            Rules for Community (Maximum 5 Allowed)
          </span>
          <Input
            placeholder="Rule No. 01"
            type="text"
            onChange={(e) => handleRulesInputChange(e, 0)}
          />
          <Input
            placeholder="Rule No. 02"
            type="text"
            onChange={(e) => handleRulesInputChange(e, 1)}
          />
          <Input
            placeholder="Rule No. 03"
            type="text"
            onChange={(e) => handleRulesInputChange(e, 2)}
          />
          <Input
            placeholder="Rule No. 04"
            type="text"
            onChange={(e) => handleRulesInputChange(e, 3)}
          />
          <Input
            placeholder="Rule No. 05"
            type="text"
            onChange={(e) => handleRulesInputChange(e, 4)}
          />
        </div>
        <Button
          type="submit"
          radius="full"
          className="bg-[var(--main-color)] text-black"
        >
          Create Community
        </Button>
      </Form>
    </section>
  );
};

export default StartCommunity;
