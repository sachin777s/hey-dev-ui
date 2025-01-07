import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { Form } from "react-router-dom";

function PasswordSetting() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  //Handling password update
  const handlePasswordChange = () => {};

  return (
    <div className="mt-12">
      <h1 className="text-xl font-semibold">Update Password</h1>
      <Form
        onSubmit={handlePasswordChange}
        className="mt-6 flex flex-col gap-6 items-start"
      >
        <Input
          required
          label="New Password"
          labelPlacement="outside"
          placeholder="Enter new password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          required
          label="Confirm Password"
          labelPlacement="outside"
          placeholder="Confirm new password..."
          type="password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <Button
          radius="full"
          className="bg-[var(--main-color)] text-black"
          type="submit"
        >
          Change
        </Button>
      </Form>
    </div>
  );
}

export default PasswordSetting;
