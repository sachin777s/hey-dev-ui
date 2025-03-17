import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import FollowersFollowingsModal from "./FollowersFollowingsModal";
import API from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMail } from "react-icons/md";
import { addUser } from "../../../app/slices/messaged-users";

const ProfileInfo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isFollowersModal, setIsFollowersModal] = useState();
  const loggedInUser = useSelector((state) => state.user.data);
  const [user, setUser] = useState(loggedInUser);
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (username !== user.username) {
      const fetchUser = async () => {
        setIsLoading(true);
        const response = await API.get(`/api/user/profile/${username}`);
        console.log(response.data);
        setUser(response.data.data);
        setIsLoading(false);
      };
      fetchUser();
    }
  }, []);

  const handleAddMessageUser = async () => {
    dispatch(addUser(user));
    navigate(`/messages/${user.username}`);
  };

  return (
    <div>
      {username === user.username && (
        <div className="pr-2 sm:pr-4 flex flex-col items-end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="cursor-pointer">
                <BsThreeDots size={24} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">
                <Link className="block w-full" to={"/edit-profile"}>
                  Edit Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link className="block w-full" to={"/create-company"}>
                  Create Company
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}

      {isLoading ? (
        <div className="py-8 flex items-center justify-center">
          <Spinner color="success" />
        </div>
      ) : (
        <>
          <div className="mt-6 flex items-center justify-center">
            <div className="p-1 h-36 md:h-44 w-36 md:w-44 rounded-full border-4 border-[var(--main-color)]">
              {user.profilePicture ? (
                <img
                  className="w-full h-full rounded-full"
                  src={user.profilePicture}
                  alt="..."
                />
              ) : (
                <FaUserCircle className="h-full w-full" />
              )}
            </div>
          </div>
          <div className="flex items-center flex-col">
            <div className="mt-2 flex flex-col">
              <span className="text-2xl font-bold">{user.fullName}</span>
              <span className="opacity-70 text-center">@{user.username}</span>
            </div>
            {user.headline && (
              <div className="mt-2 text-xl">
                <span>{user.headline}</span>
              </div>
            )}
            <div className="mt-2 flex items-center gap-2">
              <Button
                className="text-base"
                radius="full"
                size="sm"
                variant="bordered"
                onPress={() => {
                  setIsFollowersModal(true);
                  onOpen();
                }}
              >
                <span>{user.followers?.length}</span>
                <span className="opacity-70">Followers</span>
              </Button>
              <Button
                className="text-base"
                radius="full"
                size="sm"
                variant="bordered"
                onPress={() => {
                  setIsFollowersModal(false);
                  onOpen();
                }}
              >
                <span>{user.followings?.length}</span>
                <span className="opacity-70">Followings</span>
              </Button>
              <FollowersFollowingsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isFollowersModal={isFollowersModal}
              />
              <MdOutlineMail
                onClick={handleAddMessageUser}
                className="opacity-70"
                size={28}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileInfo;
