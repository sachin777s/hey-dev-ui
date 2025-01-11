import { Navbar } from "@nextui-org/react";
import React from "react";
import { BsDot } from "react-icons/bs";

function CreateCompanyNavbar() {
  return (
    <Navbar isBordered className="pl-8 sm:pl-0">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Create Company Page</h1>
      </div>
    </Navbar>
  );
}

export default CreateCompanyNavbar;
