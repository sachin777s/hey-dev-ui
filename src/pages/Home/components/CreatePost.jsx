import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { BsEmojiSmile } from "react-icons/bs";
import { IoMdVideocam } from "react-icons/io";
import { FaImage, FaLocationDot, FaUsers } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../api";
import toast from "react-hot-toast";
import {
  POST_IMAGES_FOLDER,
  POST_VIDEOS_FOLDER,
} from "../../../utils/contants";
import { uploadFileToCloudinary } from "../../../utils/uploadFileToCloudinary";
import { addUploadedPost } from "../../../app/slices/posts";
import { RiArrowDropDownLine } from "react-icons/ri";
import { addUploadedCommunityPost } from "../../../app/slices/community";

const CreatePost = () => {
  const user = useSelector((state) => state.user.data);

  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [file, setFile] = useState({ type: "", data: null });
  const [acceptFileType, setAcceptFileType] = useState("");
  const pickerRef = useRef(null);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);

  const [selectedCommunities, setselectedCommunities] = useState(
    new Set(["Your Account"])
  );
  const selectedCommunityName = useMemo(
    () => Array.from(selectedCommunities).join(", ").replaceAll("_", " "),
    [selectedCommunities]
  );

  const dispatch = useDispatch();

  // Hiding Emoji Picker onClick Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setEmojiPickerVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetching user's owned and joined communites
  useEffect(() => {
    const fetchCommunities = async () => {
      const response = await API.get("/api/user/profile/communities");
      console.log(response.data.data);
      setCommunities(response.data.data);
    };
    fetchCommunities();
  }, []);

  //Displaying Selected Image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile({
          type: file.type.startsWith("image") ? "image" : "video",
          data: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  //Handling uploading post
  const handleUploadPost = async () => {
    let media;

    toast.promise(
      async () => {
        if (file.data) {
          const url = await uploadFileToCloudinary(
            file.data,
            file.type === "image" ? POST_IMAGES_FOLDER : POST_VIDEOS_FOLDER
          );
          media = {
            type: file.type,
            url,
          };
        }

        const response = await API.post("/api/post", {
          heading,
          text,
          media,
          community: selectedCommunityId,
        });
        const post = response.data.data;
        dispatch(addUploadedPost(post));
        if (post.community !== null) {
          dispatch(addUploadedCommunityPost(post));
        }
        setHeading("");
        setText("");
        setFile({ data: null, type: "" });
      },
      {
        loading: "Uploading Post",
        success: "Post Uploaded Successfully",
        error: "Failed to upload post",
      }
    );
  };

  return (
    <div className="mt-4 px-2 sm:px-4 flex items-start gap-4">
      <div>
        <Avatar src={user.profilePicture} />
      </div>
      <div className="w-full">
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                variant="bordered"
                radius="full"
                className="capitalize text-base border-color"
              >
                {selectedCommunityName}
                <RiArrowDropDownLine size={28} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Location Type"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedCommunities}
              onSelectionChange={setselectedCommunities}
            >
              <DropdownItem
                onClick={() => setSelectedCommunityId(null)}
                key="Your Account"
              >
                Your Account
              </DropdownItem>
              <DropdownItem isDisabled key="community">
                <span className="text-lg">Communities</span>
              </DropdownItem>
              {communities.map((community, i) => (
                <DropdownItem
                  className="flex"
                  value={"#23!FS3F3"}
                  key={community.name}
                  onClick={() => setSelectedCommunityId(community._id)}
                >
                  <div className="flex items-center justify-center gap-2">
                    {community.logo ? (
                      <img
                        className="h-[18px] rounded-sm"
                        src={community.logo}
                        alt="..."
                      />
                    ) : (
                      <FaUsers />
                    )}
                    <span>{community.name}</span>
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mt-4">
          <input
            className="p-2 w-full rounded-lg outline-none border border-color bg-transparent"
            type="text"
            placeholder="Heading..."
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            maxLength={100}
          />
          <textarea
            maxLength={1000}
            value={text}
            onChange={(e) => setText(e.target.value)}
            id="tweetBox"
            placeholder="Write your post..."
            class="mt-1 p-2 w-full bg-transparent border border-color rounded-lg focus:outline-none resize-none overflow-hidden"
            rows="3"
          />
        </div>

        <div className="w-full">
          {file.data && (
            <>
              {file.type === "image" ? (
                <div className="relative">
                  <div className="w-[32px] h-[32px] p-2 bg-black text-white rounded-full absolute top-4 right-4 font-bold">
                    <ImCross
                      onClick={() => setFile({ data: null, type: "" })}
                    />
                  </div>
                  <img
                    src={file.data}
                    alt="Selected"
                    className="mx-auto max-w-full max-h-96 rounded-2xl"
                  />
                </div>
              ) : (
                <div className="w-full relative">
                  <div
                    onClick={() => {
                      setFile({ data: null, type: "" });
                      console.log("Video closed");
                    }}
                    className="w-[32px] h-[32px] p-2 bg-black text-white rounded-full absolute top-4 right-4 font-bold z-[999]"
                  >
                    <ImCross className="cursor-pointer" />
                  </div>
                  <video controls autoPlay className="w-full">
                    <source src={file.data} type="video/mp4" />
                  </video>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between text-[var(--main-color)]">
          <div className="flex items-center justify-start gap-4">
            <div>
              <label
                onClick={() => setAcceptFileType("image/*")}
                htmlFor="file-upload"
              >
                <FaImage size={20} />
              </label>
              <input
                onChange={handleFileChange}
                id="file-upload"
                name="file-upload"
                type="file"
                accept={acceptFileType}
                className="hidden"
              />
            </div>
            <div>
              <label htmlFor="file-upload">
                <IoMdVideocam
                  onClick={() => setAcceptFileType("video/*")}
                  size={20}
                />
              </label>
            </div>
            <div className="flex relative">
              <div
                ref={pickerRef}
                className={`${
                  isEmojiPickerVisible ? "block" : "hidden"
                } absolute top-6 left-0 -translate-x-1/3 md:translate-x-0 z-50`}
              >
                <EmojiPicker
                  theme={
                    localStorage.getItem("theme")
                      ? localStorage.getItem("theme")
                      : "dark"
                  }
                  onEmojiClick={(emoji) =>
                    setText((prev) => prev + emoji.emoji)
                  }
                />
              </div>
              <BsEmojiSmile
                onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
                size={20}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>{text.length}/1000</span>
            <Button
              isDisabled={!text}
              className="bg-[var(--main-color)] text-black"
              radius="full"
              onClick={handleUploadPost}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
