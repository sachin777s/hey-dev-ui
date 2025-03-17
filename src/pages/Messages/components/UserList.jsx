import { Avatar, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../api";
import { fetchUsers } from "../../../app/slices/messaged-users";

const UserList = () => {
  const users = useSelector((state) => state.messagedUsers.data);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    if (users.length > 0) {
      return;
    }
    const fetchMessagedUsers = async () => {
      setIsLoading(true);
      const response = await API.get("/api/message/users/messaged");
      console.log(response.data);
      dispatch(fetchUsers(response.data.data));
      setIsLoading(false);
    };
    fetchMessagedUsers();
  }, []);

  return (
    <div className="">
      <div className="mx-auto mt-2 w-2/3 min-w-[16rem] flex items-center justify-center relative">
        <input
          autoComplete={false}
          autoCorrect={false}
          placeholder="Search Here..."
          onChange={handleInputChange}
          value={inputText}
          className="py-2 pr-12 px-4 w-full border-none border-b-2 border-gray-700 outline-none rounded-3xl"
          type="text"
        />
        <BsSearch size={18} className="absolute right-4" />
      </div>
      <div className="mt-4 border-t-[0.5px] border-color">
        {users.map((user, i) => {
          return (
            <Link
              to={`/messages/${user.username}`}
              key={i}
              className="px-2 sm:px-4 py-2 flex items-center gap-2 border-b-[0.5px] border-color bg-hover"
            >
              <Avatar src={user.profilePicture} />
              <div className="flex flex-col">
                <span className="flex items-center">
                  <strong>{user.fullName}</strong>
                </span>
                <span className="">@{user.username}</span>
              </div>
            </Link>
          );
        })}
        {isLoading && (
          <div className="flex items-center justify-center">
            <Spinner color="success" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
