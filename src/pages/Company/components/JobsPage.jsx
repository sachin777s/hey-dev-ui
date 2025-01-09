import React from "react";
import CreateJob from "./CreateJob";
import { Button, useDisclosure } from "@nextui-org/react";
import CreateJobModal from "./CreateJobModal";

function JobsPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="px-2 sm:px-4 pb-12">
      <div className="flex flex-col gap-4">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <CreateJob key={i} />
          ))}
      </div>
      <Button
        onPress={onOpen}
        radius="full"
        className="mt-4 bg-[var(--main-color)] text-black"
      >
        New Job
      </Button>
      <CreateJobModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}

export default JobsPage;
