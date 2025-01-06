import React, { useState } from "react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Form } from "@nextui-org/form";

function BasicInformation() {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    headline: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-semibold">Basic Information</h1>
      <Form
        validationBehavior="native"
        onSubmit={submitHandler}
        className="mt-4 w-full flex flex-col gap-8"
      >
        <Input
          required
          label="Name"
          labelPlacement="outside"
          name="fullname"
          placeholder="Enter your full name..."
          type="text"
          onChange={handleInputChange}
          value={user.fullname}
        />
        <Input
          required
          label="Username"
          labelPlacement="outside"
          name="username"
          placeholder="Enter your username..."
          type="text"
          onChange={handleInputChange}
          value={user.username}
        />
        <Input
          isDisabled
          required
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email..."
          type="email"
          onChange={handleInputChange}
          value={"john@gmail.com"}
        />
        <Input
          label="Headline"
          labelPlacement="outside"
          name="headline"
          placeholder="Type headline.."
          type="text"
          onChange={handleInputChange}
          value={user.headline}
          maxLength={100}
        />
        <Textarea
          defaultValue={""}
          name="description"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description..."
          onChange={handleInputChange}
          value={user.description}
          maxLength={500}
        />
        <Button
          radius="full"
          type="submit"
          className="bg-[var(--main-color)] text-black"
          onChange={handleInputChange}
        >
          Update
        </Button>
      </Form>
    </div>
  );
}

export default BasicInformation;
