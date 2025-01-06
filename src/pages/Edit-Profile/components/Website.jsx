import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";

function Website() {
  const [value, setValue] = useState("");

  // Handling website URL update
  const handleUpdateWebsite = (e) => {
    e.preventDefault();
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
          type="url"
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
