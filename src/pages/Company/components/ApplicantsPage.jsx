import { Button, User } from "@nextui-org/react";
import React, { useState } from "react";

function ApplicantsPage() {
  const [isOpen, setIsOpen] = useState({
    index: null,
    isOpen: false,
  });

  return (
    <div className="px-2 sm:px-4 flex flex-col gap-4 pt-4">
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="px-4 py-2 rounded-xl border border-color">
            <div className="">
              <h1 className="text-xl font-semibold">Next.js Developer</h1>
              <Button
                className="mt-2"
                onClick={() => setIsOpen({ index: i, isOpen: !isOpen.isOpen })}
              >
                {isOpen.index === i && isOpen.isOpen
                  ? "Hide Applicants"
                  : "See Applicants"}
              </Button>
            </div>
            {isOpen.index === i && isOpen.isOpen && (
              <div className="mt-4 flex flex-col gap-2">
                {Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <div className="p-2 rounded-lg border border-color flex items-center justify-between">
                      <User
                        avatarProps={{
                          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        }}
                        name="Aditya"
                        description="@aditya987"
                      />

                      <div className="flex items-center gap-2">
                        <Button
                          variant="bordered"
                          className="border-[var(--main-color)] text-[var(--main-color)]"
                          onClick={() =>
                            window.open("https://google.com", "_blank")
                          }
                        >
                          View Resume
                        </Button>
                        <Button
                          variant="bordered"
                          className="border-[var(--main-color)] text-[var(--main-color)]"
                          onClick={() =>
                            window.open(`mailto:${"user@gmail.com"}`, "_blank")
                          }
                        >
                          Mail
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default ApplicantsPage;
