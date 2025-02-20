import { Navbar } from "@nextui-org/react";
import React from "react";
import { BsDot, BsSearch } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import SeachCommunityModal from "./components/SeachCommunityModal";

const CommunitiesNavbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Navbar isBordered className="pl-8 sm:pl-0">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">Communities</h1>
      </div>
      <div className="flex items-center justify- gap-2">
        {/* Search Modal */}
        <SeachCommunityModal isOpen={isOpen} onOpenChange={onOpenChange} />
        <BsDot />
        <div>
          <BsSearch onClick={onOpen} />
        </div>
        <Link to={"/communities/start-community"}>
          <AiOutlineUsergroupAdd size={22} />
        </Link>
      </div>
    </Navbar>
  );
};

export default CommunitiesNavbar;
