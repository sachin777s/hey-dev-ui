import React, { useState } from "react";
import SinglePost from "../../../components/SinglePost";
import { Avatar, Button, useDisclosure } from "@nextui-org/react";
import CreateReplyModal from "./CreateReplyModal";

function Replies() {
  // const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className="px-2 sm:px-4 py-4 border-y border-color flex items-center justify-between cursor-text"
      >
        <div className="flex items-center gap-2">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          <span className="opacity-70 sm:text-xl">Reply on this post...</span>
        </div>
        <Button
          radius="full"
          isDisabled
          className="bg-[var(--main-color)] text-black"
        >
          Reply
        </Button>
      </div>
      {/* <CreateReplyModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
      {isOpen && <CreateReplyModal setIsOpen={setIsOpen} />}
      <div className="px-2 sm:px-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <SinglePost />
              <div></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Replies;
