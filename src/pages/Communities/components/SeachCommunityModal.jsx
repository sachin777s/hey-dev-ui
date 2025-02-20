import {
  Avatar,
  AvatarGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import API from "../../../api";

function SeachCommunityModal({ isOpen, onOpenChange }) {
  const [communities, setCommunities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      // Check if we've scrolled to the bottom with a small threshold
      if (scrollHeight - scrollTop - clientHeight < 50) {
        if (hasMore && !isLoading) {
          setCurrentPage((prev) => prev + 1);
          console.log(currentPage);
        }
        console.log("fsfafadfsda");
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    if (!hasMore || isLoading) {
      return;
    }

    const fetchCommunities = async () => {
      setIsLoading(true);
      const response = await API.get(
        `/api/community?page=${currentPage}&limit=5`
      );
      console.log(response);
      setCommunities((prev) => [...prev, ...response.data.data]);
      setHasMore(response.data.data.length === 5);
      setIsLoading(false);
    };
    fetchCommunities();
  }, [currentPage]);

  return (
    <Modal
      className="absolute bg-white dark:bg-black"
      placement="top"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled
      scrollBehavior="inside"
      size="xl"
    >
      <ModalContent className="p-0">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <span className="flex items-center gap-1">
                <IoIosArrowRoundBack onClick={() => onClose()} size={26} />{" "}
                Discover Communities
              </span>
              <div className="mt-4 w-[90%] relative flex items-center">
                <input
                  className="w-full pl-4 pr-10 py-2 rounded-full outline-none border font-normal"
                  type="text"
                  placeholder="Search Here..."
                />
                <BsSearch className="absolute right-4" />
              </div>
            </ModalHeader>
            <ModalBody ref={scrollContainerRef}>
              <div className="">
                {/* Communities recomendations based on search */}
                <div className="mt-8">
                  {communities.map((community, i) => (
                    <Link
                      key={i}
                      to={`/communities/${community._id}`}
                      onClick={() => onClose()}
                      className="py-2 border-t-[0.5px] dark:border-[#545454] flex items-center gap-2"
                    >
                      <div className="h-32 w-32 rounded-2xl bg-gray-300 overflow-hidden">
                        <img
                          className=" h-full object-cover"
                          src={community.logo}
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">{community.name}</span>
                        <span className="">
                          <span className="font-semibold">
                            {community.memberCount}
                          </span>
                          <span className="opacity-70"> Members</span>
                        </span>
                        <div>
                          <AvatarGroup max={3}>
                            {Array(3)
                              .fill(0)
                              .map(() => (
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                              ))}
                          </AvatarGroup>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {isLoading && (
                    <div className="py-8 flex items-center justify-center">
                      <Spinner color="success" />
                    </div>
                  )}
                  {!isLoading && !hasMore && (
                    <div className="py-8 flex items-center justify-center">
                      No More Communities
                    </div>
                  )}
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default SeachCommunityModal;
