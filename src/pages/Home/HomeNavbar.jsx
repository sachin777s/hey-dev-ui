import { Navbar } from "@nextui-org/react";
import React from "react";

const HomeNavbar = () => {
  return (
    <Navbar isBordered>
      <div className="pl-8 sm:pl-0 flex items-center">
        <h1 className="text-xl font-semibold">Home</h1>
      </div>
    </Navbar>
  );
};

export default HomeNavbar;
