import {
  Avatar,
  AvatarGroup,
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
import { FaUsers } from "react-icons/fa6";
import { IoMdInformationCircle } from "react-icons/io";
import { MdArticle } from "react-icons/md";
import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
  useParams,
} from "react-router-dom";
import EditCommunityModal from "./EditCommunityModal";
import API from "../../../../api";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommunity,
  fetchCommunity,
} from "../../../../app/slices/community";
import toast from "react-hot-toast";

const SingleCommunity = () => {
  const community = useSelector((state) => state.community.data);
  const user = useSelector((state) => state.user.data);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { communityId } = useParams();
  // const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    {
      label: "Posts",
      path: `/communities/${communityId}/posts`,
      icon: <MdArticle />,
    },
    {
      label: "About",
      path: `/communities/${communityId}/about`,
      icon: <IoMdInformationCircle />,
    },
    {
      label: "Members",
      path: `/communities/${communityId}/members`,
      icon: <FaUsers />,
    },
  ];

  useEffect(() => {
    const fetchCommunityData = async () => {
      setLoading(true);
      const response = await API.get(`/api/community/${communityId}`);
      console.log(response.data);
      dispatch(fetchCommunity(response.data.data));
      setLoading(false);
    };
    fetchCommunityData();
  }, []);

  // is current user member or not
  const isUserMember = () => {
    let isMember = false;
    community?.members?.forEach((member) => {
      if (member._id === user._id) {
        isMember = true;
      }
    });
    return isMember;
  };

  const handleJoinCommunity = () => {
    if (community?.creator._id === user._id) {
      toast.error("You are already member");
    }
    const isMember = isUserMember();
    toast.promise(
      async () => {
        const response = await API.put(`/api/community/${community._id}/join`);
        console.log(response.data);
        dispatch(fetchCommunity(response.data.data));
      },
      {
        loading: `Processing ${isMember ? "Left" : "Join"} Community`,
        success: `${isMember ? "Lefted" : "Joined"} Community Successfully`,
        error: `Failed to ${isMember ? "Left" : "Join"} Community`,
      }
    );
  };

  // Delete existing community
  const handleDeleteCommunity = async () => {
    toast.promise(
      async () => {
        await API.delete(`/api/community/${community._id}`);
        dispatch(deleteCommunity(communityId));
        navigate("/communities");
      },
      {
        loading: "Deleting Community",
        success: "Community Deleted Successfully",
        error: "Failed to Delete",
      }
    );
  };
  return (
    <>
      {loading ? (
        <div className="mt-8 flex items-center justify-center">
          <Spinner color="success" />
        </div>
      ) : (
        <>
          <div className="px-2 sm:px-4 flex flex-col">
            {community?.creator?._id === user._id && (
              <div className="self-end">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <div className="cursor-pointer">
                      <BsThreeDots size={24} />
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="settings">
                      <Link onClick={onOpen} className="block w-full" to={"#"}>
                        Edit Community Settings
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="settings">
                      <Link
                        onClick={handleDeleteCommunity}
                        className="block w-full text-red-500"
                        to={"#"}
                      >
                        Delete Community
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <EditCommunityModal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                />
              </div>
            )}
            <div className="mt-12 max-w-[200px] max-h-[200px] overflow-hidden rounded-2xl self-center">
              {community.logo ? (
                <img
                  className="max-w-full max-h-full"
                  src={community?.logo}
                  alt=""
                />
              ) : (
                <FaUsers size={120} />
              )}
            </div>
            <div className="relative px-2 sm:px-4 flex flex-col items-center">
              <span className="mt-2 text-3xl font-semibold text-center">
                {community?.name}
              </span>
              <span className="mt-2 text-xl text-center">
                {community?.headline}
              </span>
              <Link
                to={"/communities/4545/members"}
                className="mt-2 px-2 flex items-center gap-4 hover:bg-gray-200 dark:hover:bg-gray-900"
              >
                <AvatarGroup>
                  {community?.memberCount !== 0 &&
                    community?.members
                      ?.slice(0, 3)
                      .map((_, i) => <Avatar key={i} src={_.profilePicture} />)}
                </AvatarGroup>
                <span>
                  <span className="font-semibold">
                    {community?.memberCount + 1}
                  </span>{" "}
                  Members
                </span>
              </Link>
              <div className="mt-2 mr-2 sm:mr-4">
                {community?.creator?._id !== user._id && (
                  <Button
                    onClick={handleJoinCommunity}
                    radius="full"
                    variant={`${isUserMember() && "bordered"}`}
                    className={`${
                      isUserMember()
                        ? "text-[var(--main-color)] border-[var(--main-color)]"
                        : "text-black bg-[var(--main-color)]"
                    }`}
                  >
                    {isUserMember() ? "Left" : "Join"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tab Section */}
          <div className="mt-4 py-1 px-2 grid grid-cols-3 gap-2 bg-[#D4D4D8] dark:bg-[#3F3F46]">
            {links.map((_, i) => (
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive && "bg-white dark:bg-black"
                  } py-2 text-center rounded-xl flex items-center justify-center gap-1 ${
                    !isActive && "hover:bg-[#edebeb] dark:hover:bg-[#151515]"
                  }`
                }
                to={_.path}
              >
                {_.icon} {_.label}
              </NavLink>
            ))}
          </div>

          <div className="px-2 sm:px-4 pt-4 border-t-[0.5px] border-color">
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default SingleCommunity;
