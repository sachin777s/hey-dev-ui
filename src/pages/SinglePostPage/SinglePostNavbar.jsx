import { Navbar } from "@nextui-org/react";
import React from "react";

function SinglePostNavbar() {
  return (
    <Navbar
      isBordered
      className="pl-8 sm:pl-0 border-b[0.5px] border-color"
    >
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Post</h1>
      </div>
    </Navbar>
  );
}

export default SinglePostNavbar;
