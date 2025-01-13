import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { BsChat, BsDot, BsHeart, BsThreeDots } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import CreateReplyModal from "../pages/SinglePostPage/components/CreateReplyModal";
import { Link, useNavigate } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

const SinglePost = ({ post, user, isReplyHierarchy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false);
  const videoRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState(1.1);

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

  return (
    <div
      className={`relative py-6 w-full flex flex-shrink items-start gap-2 ${
        !isReplyHierarchy && "border-b-[0.5px] border-color"
      }`}
    >
      <Link to={`/profile`} className="block">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        {isReplyHierarchy && (
          <div className="absolute left-[18px] w-[1px] h-[calc(100%-45px)] bg-black dark:bg-white"></div>
        )}
      </Link>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Link to={`/profile`} className="font-semibold">
              {"Sachin Kumar"}
            </Link>
            <div className="flex items-center">
              <Link to={`/profile`} className="opacity-70 hover:underline">
                {"@sachin777sk"}
              </Link>
              <BsDot />
              <span className="opacity-70">Oct 12</span>
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="cursor-pointer">
                <BsThreeDots size={24} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="settings">Copy Link</DropdownItem>
              {true && <DropdownItem key="settings">Delete Post</DropdownItem>}
              {true && (
                <DropdownItem key="settings">
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
          <h1 className="text-lg font-semibold">{"This is heading"}</h1>
          <p className="mt-1">
            {convertUrlsToLinks(
              "Check out my repos at github.com/sachin777sk and www.github.com/sachin777sk. You can also visit https://github.com/sachin777sk for more projects!"
            )}
          </p>
        </div>
        {true &&
          (true ? (
            <>
              <Image
                onClick={() => setImageOpen(true)}
                isBlurred
                alt="NextUI Album Cover"
                className="mt-6 max-h-[600px] max-w-full"
                src="https://cdn.pixabay.com/photo/2024/02/28/15/14/ai-generated-8602228_640.jpg"
              />
              {isImageOpen &&
                ReactDOM.createPortal(
                  <div className="w-full h-screen fixed top-0 left-0 inset-0 flex items-center justify-center backdrop-brightness-[0.1] z-[999]">
                    <IoCloseSharp
                      onClick={() => setImageOpen(false)}
                      className="text-4xl absolute top-2 right-2 rounded-full bg-white dark:bg-black"
                    />
                    <img
                      className="min-w-[360px] max-w-screen max-h-screen"
                      src="https://cdn.pixabay.com/photo/2024/05/15/20/57/developer-8764523_640.jpg"
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
                // src="https://videos.pexels.com/video-files/853986/853986-sd_640_360_25fps.mp4"
                src="https://cdn.pixabay.com/video/2024/12/26/248879_tiny.mp4"
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

          <div className="flex items-center gap-1 cursor-pointer hover:text-[var(--main-color)]">
            <BsHeart size={16} />
            <span className="text-sm">12K</span>
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
