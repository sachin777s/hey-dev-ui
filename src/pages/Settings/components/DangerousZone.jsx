import { Button } from "@nextui-org/react";
import React from "react";

function DangerousZone() {
  //Handling Logout Account
  const handleLogout = () => {};

  //Handling Deactivate Account
  const handleDeactivate = () => {};
  return (
    <div className="mt-12">
      <h1 className="text-xl font-semibold text-red-500">Dangerous Zone</h1>
      <div className="mt-4 flex flex-col gap-2 items-start">
        <Button
          onClick={handleLogout}
          className="bg-red-500 font-semibold text-white"
        >
          Logout
        </Button>
        <Button
          onClick={handleDeactivate}
          className="bg-red-500 font-semibold text-white"
        >
          Deactivate
        </Button>
      </div>
    </div>
  );
}

export default DangerousZone;
