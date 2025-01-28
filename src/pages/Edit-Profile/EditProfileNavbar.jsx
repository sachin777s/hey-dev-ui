import { Navbar } from "@nextui-org/react";
import React from "react";
import { BsDot } from "react-icons/bs";
import { UserButton } from "@clerk/clerk-react";

function EditProfileNavbar() {
  
  return (
    <Navbar isBordered className="pl-8 sm:pl-0 border-b[0.5px] border-color">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Edit Profile</h1>
      </div>
      <div>
        <UserButton label />
      </div>
    </Navbar>
  );
}

export default EditProfileNavbar;
