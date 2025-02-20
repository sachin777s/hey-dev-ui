import { Avatar, Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import API from "../../../../api";

const Members = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState();

  const { communityId } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true);
      const response = await API.get(`/api/community/${communityId}/members`);
      console.log(response.data);
      setMembers(response.data.data);
      setIsLoading(false);
    };
    fetchMembers();
  }, []);

  // For Changing Search Input Value
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="max-w-[450px] py-2 w-[90%] relative">
          <input
            className="w-full pl-4 pr-10 py-2 rounded-full outline-none border-[0.5px] border-color"
            onChange={handleInputChange}
            value={searchValue}
            type="text"
            placeholder="Search Here..."
          />
          <BsSearch
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="w-full border-t-[0.5px] border-color">
        {isLoading ? (
          <div className="mt-8 flex items-center justify-center">
            <Spinner color="success" />
          </div>
        ) : (
          members?.map((member, i) => (
            <div
              key={i}
              className="px-2 sm:px-4 py-2 w-full flex items-center justify-between"
            >
              <Link to={""} className="flex items-center gap-2">
                <Avatar src={member.profilePicture} />
                <div className="flex flex-col">
                  <span>{member.fullName}</span>
                  <span>@{member.username}</span>
                </div>
                {false && (
                  <span className="block px-2 bg-black dark:bg-white text-white dark:text-black rounded-md">
                    Admin
                  </span>
                )}
              </Link>
              <Button
                className="bg-[var(--main-color)] text-black rounded-full"
                variant="flat"
              >
                Follow
              </Button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Members;
