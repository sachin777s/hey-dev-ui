import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { BsChat, BsDot, BsHeart, BsThreeDots } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import CreateReplyModal from "../pages/SinglePostPage/components/CreateReplyModal";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import API from "../api";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../app/slices/posts";
import { timeAgo } from "../utils/timeAgo";
import toast from "react-hot-toast";
import { removePost } from "../app/slices/posts";

const SinglePost = ({ post, user, isReplyHierarchy }) => {
  const currentUserId = useSelector((state) => state.user.data._id); // logged in user id

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false);
  const videoRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(1.1);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [isPostLinkCopied, setIsPostLinkCopied] = useState(false);

  const dispatch = useDispatch();

  // Converting text string into links added string
  const navigate = useNavigate();
  const convertUrlsToLinks = (text) => {
    const urlPattern =
      /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

    const parts = text.split(urlPattern);
    const matches = text.match(urlPattern) || [];

    return parts.map((part, index) => {
      if (index < matches.length) {
        const url = matches[index];
        const href = url.startsWith("http") ? url : `https://${url}`;
        return (
          <>
            {part}
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 break-all"
            >
              {url}
            </a>
          </>
        );
      }
      return part;
    });
  };

  //Calculating ratio of height and width of video
  useEffect(() => {
    if (videoRef.current) {
      const videoWidth = videoRef.current.videoWidth;
      const videoHeight = videoRef.current.videoHeight;

      if (videoWidth && videoHeight) {
        setAspectRatio(videoWidth / videoHeight);
      }
    }
  }, []);

  // Like or Deslike the post
  const likePost = async () => {
    try {
      setIsLikeLoading(true);
      const response = await API.put(`/api/post/${post._id}/like`);
      console.log(response.data);
      dispatch(updatePost(response.data.data.post));
      setIsLikeLoading(false);
    } catch (error) {
      console.log(error);
      setIsLikeLoading(false);
    }
  };

  // Deleting existing the post
  const handleDeletePost = () => {
    toast.promise(
      async () => {
        const response = await API.delete(`/api/post/${post._id}`);
        console.log(response.data);
        dispatch(removePost(post));
      },
      {
        loading: "Deleting the post",
        success: "Post Deleted Successfully",
        error: "Failed to deletd post",
      }
    );
  };

  // Following post's user
  const handleFollowUser = () => {};

  const handleCopyPostLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://locahost:5173/post/${post._id}`);
      setIsPostLinkCopied(true);

      // Reset "Copied!" message after 3 seconds
      setTimeout(() => setIsPostLinkCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`relative py-6 w-full flex flex-shrink items-start gap-2 ${
        !isReplyHierarchy && "border-b-[0.5px] border-color"
      }`}
    >
      <Link to={`/profile`} className="block">
        <Avatar src={user.profilePicture} />
        {isReplyHierarchy && (
          <div className="absolute left-[18px] w-[1px] h-[calc(100%-45px)] bg-black dark:bg-white"></div>
        )}
      </Link>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Link to={`/profile`} className="font-semibold">
              {user.fullName}
            </Link>
            <div className="flex items-center">
              <Link to={`/profile`} className="opacity-70 hover:underline">
                {user.username}
              </Link>
              <BsDot />
              <span className="opacity-70">{timeAgo(post.createdAt)}</span>
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="cursor-pointer">
                <BsThreeDots size={24} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem onClick={handleCopyPostLink} key="settings">
                {isPostLinkCopied ? "Copied" : "Copy Link"}
              </DropdownItem>
              {currentUserId === user._id && (
                <DropdownItem onClick={handleDeletePost} key="settings">
                  Delete Post
                </DropdownItem>
              )}
              {currentUserId !== user._id && (
                <DropdownItem onClick={handleFollowUser} key="settings">
                  Follow {"sachin777sk"}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div
          onClick={() => navigate(`/post/${9977}`)}
          className="mt-1 cursor-pointer"
        >
          <h1 className="text-lg font-semibold">{post.heading}</h1>
          <p className="mt-1">{convertUrlsToLinks(post.text)}</p>
        </div>
        {post.media &&
          (post.media.type === "image" ? (
            <>
              <div className="flex justify-center">
                <Image
                  onClick={() => setImageOpen(true)}
                  isBlurred
                  alt="NextUI Album Cover"
                  className="mt-6 max-h-[600px] max-w-full"
                  src={post.media.url}
                />
              </div>
              {isImageOpen &&
                ReactDOM.createPortal(
                  <div className="w-full h-screen fixed top-0 left-0 inset-0 flex items-center justify-center backdrop-brightness-[0.1] z-[999]">
                    <IoCloseSharp
                      onClick={() => setImageOpen(false)}
                      className="text-4xl absolute top-2 right-2 rounded-full bg-white dark:bg-black"
                    />
                    <img
                      className="min-w-[360px] max-w-screen max-h-screen"
                      src={post.media.url}
                      alt=""
                    />
                  </div>,
                  document.body
                )}
            </>
          ) : (
            <div
              className={`mt-6 w-full ${
                aspectRatio > 1 ? "h-auto" : "h-[400px]"
              } rounded-2xl border border-color overflow-hidden`}
            >
              <video
                className="mx-auto max-w-full max-h-[400px] h-full"
                ref={videoRef}
                autoPlay={true}
                controls={true}
                loop
                src={post.media.url}
              ></video>
            </div>
          ))}
        <div className="mt-4 flex items-center justify-evenly">
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]"
          >
            <BsChat size={16} />
            <span className="text-sm">1K</span>
            {isModalOpen && (
              <CreateReplyModal
                otherUser={null}
                post={null}
                setIsOpen={setIsModalOpen}
              />
            )}
          </div>
          <div
            onClick={likePost}
            className={`w-[42px] flex items-center gap-1 cursor-pointer ${
              post.likes.includes(user._id) && "text-[var(--main-color)]"
            } hover:text-[var(--main-color)]`}
          >
            {isLikeLoading ? (
              <Spinner color="success" size="sm" />
            ) : (
              <>
                <BsHeart size={16} />
                <span className="text-sm">{post.likesCount}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]">
            <IoIosStats size={16} />
            <span className="text-sm">99K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
