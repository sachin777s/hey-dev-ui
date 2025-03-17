import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { BsDot, BsDownload, BsEmojiSmile } from "react-icons/bs";
import { FaImage } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoMdSend } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import API from "../../../api";
import { uploadFileToCloudinary } from "../../../utils/uploadFileToCloudinary";
import { MESSAGE_IMAGES_FOLDER } from "../../../utils/contants";
import { io } from "socket.io-client";

// // Socket.io initialization
// const socket = io("http://localhost:8080");

const MessageUser = () => {
  const loggedInUser = useSelector((state) => state.user.data);

  const users = useSelector((state) => state.messagedUsers.data);

  const { username } = useParams();
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const emojiRef = useRef(null);
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalImageMessage, setModalImageMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef(null);

  const socket = useMemo(() => io("http://localhost:8080"), []);

  // Adding the user in users list
  useEffect(() => {
    if (loggedInUser) {
      socket.emit("add-user", loggedInUser._id);
    }
  }, [user]);

  // Listening recieve message from user
  useEffect(() => {
    const messageListener = (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("msg-recieve", messageListener);
  }, [socket]);

  // Real time typing effect
  useEffect(() => {
    socket.on("user-typing", (sender) => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setIsTyping(true);
    });

    socket.on("user-stopped-typing", (sender) => {
      setIsTyping(false);
    });

    return () => {
      socket.off("user-typing");
      socket.off("user-stopped-typing");
    };
  }, [socket]);

  // Extracting the current message user
  useEffect(() => {
    const user = users.filter((user) => user.username === username)[0];
    console.log("This is message user", user);
    setUser(user);
  }, []);

  // Scrolling the scrollbar to the bottom on adding the new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hiding Emoji Picker onClick Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetching all the messages
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await API.get(`/api/message/${user?._id}`);
      console.log(response.data);
      setMessages(response.data.data);
    };
    fetchMessages();
  }, [user]);

  //Displaying Selected Image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handling input change
  const handleInputChange = (e) => {
    setMessage(e.target.value);

    // Emit typing event
    socket.emit("typing", { sender: loggedInUser._id, receiver: user._id });

    // Stop typing event after a delay

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit("stop-typing", {
        sender: loggedInUser._id,
        receiver: user._id,
      });
    }, 1000);
  };

  const messageImageClickHandler = (i) => {
    setModalImageMessage(messages[i]);
    onOpen();
  };

  // Handling sendint the message
  const handleSendMessage = async () => {
    const newMessage = {
      text: message,
      image: selectedImage,
      reciever: user._id,
      sender: loggedInUser._id,
    };
    setMessage("");
    setSelectedImage(null);
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("send-msg", newMessage);
    let imageUrl = null;
    if (selectedImage) {
      imageUrl = await uploadFileToCloudinary(
        selectedImage,
        MESSAGE_IMAGES_FOLDER
      );
    }
    const response = await API.post(`/api/message`, {
      text: message,
      image: imageUrl,
      reciever: user._id,
    });
    console.log(response.data);
    console.log(messages);
    setMessages((prev) => {
      const messages = [...prev];
      messages[messages.length - 1] = response.data.data;
      return messages;
    });
    console.log(messages);
  };

  return (
    <div className="h-full">
      <div
        ref={scrollRef}
        className="px-2 sm:px-34 h-[calc(100vh-120px)] overflow-y-scroll scrollbar-hide md:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray"
      >
        <div className="mt-4 flex flex-col items-center">
          <Avatar src={user?.profilePicture} className="w-20 h-20 text-large" />
          <span className="text-2xl">{user?.fullName}</span>
          <span className="text-xl opacity-70">@{user?.username}</span>
        </div>

        {/* Chat section */}
        <div className="mt-4 flex flex-col gap-1">
          {messages.map((_, i) => {
            return (
              <div
                ref={i === messages.length - 1 ? scrollRef : null}
                key={i}
                className={`max-w-[60%] flex flex-col ${
                  _.sender === user._id
                    ? "self-start items-start"
                    : "self-end items-end"
                }`}
              >
                {_.text && (
                  <span
                    className={`py-2 px-4 ${
                      _.sender === user._id
                        ? "rounded-[100px_100px_100px_0] bg-[#282934] text-white"
                        : "rounded-[100px_100px_0_100px] bg-[var(--main-color)] text-black"
                    }`}
                  >
                    {_.text}
                  </span>
                )}
                <div className="mt-1 w-full">
                  <img
                    onClick={() => messageImageClickHandler(i)}
                    className="w-full min-w-[14rem]"
                    src={_.image}
                    alt=""
                  />
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="text-sm italic text-gray-500 mt-1">typing...</div>
          )}
        </div>
      </div>

      {/* Message input section */}
      <div className="relative flex flex-col">
        <div
          className={`px-2 sm:px-4 w-full bg-white dark:bg-black absolute bottom-[50px] ${
            selectedImage ? "block" : "hidden"
          } shadow-[-6px_-8px_19px_-13px_gray]`}
        >
          <div className="relative">
            <div className="w-[22px] h-[22px] bg-black text-white rounded-full flex items-center justify-center absolute top-4 right-4">
              <ImCross size={12} onClick={() => setSelectedImage(null)} />
            </div>
            <img
              className={`${selectedImage ? "h-[160px]" : "h-0"}`}
              src={selectedImage}
              alt=""
            />
          </div>
        </div>
        <div className="px-2 sm:px-4 h-[50px] border-t-[0.5px] border-color flex items-center justify-center flex-col">
          <div className="w-full flex items-center justify-center gap-4">
            {/* Emoji */}
            <div className="flex relative">
              <div
                ref={emojiRef}
                className={`${
                  isEmojiPickerVisible ? "block" : "hidden"
                } absolute bottom-6 left-1/2 z-10`}
              >
                <EmojiPicker
                  onEmojiClick={(emoji) =>
                    setMessage((prev) => prev + emoji.emoji)
                  }
                />
              </div>
              <BsEmojiSmile
                color="var(--main-color)"
                onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
                size={20}
              />
            </div>
            {/* Image Input */}
            <div>
              <label htmlFor="image-upload">
                <FaImage color="var(--main-color)" size={20} />
              </label>
              <input
                onChange={handleFileChange}
                id="image-upload"
                name="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
            {/* Message Input */}
            <div className="w-full relative">
              <input
                value={message}
                onChange={handleInputChange}
                type="text"
                placeholder="Start Message..."
                className="w-full border-none outline-none pl-4 pr-10 py-2 rounded-full"
              />
              <IoMdSend
                onClick={handleSendMessage}
                color="var(--main-color)"
                size={28}
                className="absolute right-1 top-[6px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Message Image Modal */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-4 relative">
                <div className="flex items-center">
                  <Avatar
                    src={
                      modalImageMessage.sender === user._id
                        ? user.profilePicture
                        : loggedInUser.profilePicture
                    }
                  />
                  <span className="ml-2 font-bold">
                    {modalImageMessage.sender === user._id
                      ? user.fullName
                      : loggedInUser.fullName}
                  </span>
                  <BsDot />
                  <span className="font-normal">
                    {modalImageMessage.sender === user._id
                      ? user.username
                      : loggedInUser.username}
                  </span>
                </div>
                <Link download={modalImageMessage}>
                  <Button isIconOnly>
                    <BsDownload size={18} />
                  </Button>
                </Link>
                <Button
                  isIconOnly
                  onPress={onClose}
                  className="rounded-full absolute right-4 md:right-8"
                >
                  <RxCross2 size={22} />
                </Button>
              </ModalHeader>
              <ModalBody className="">
                <img
                  className="max-h-[90vh] object-contain"
                  src={modalImageMessage.image}
                  alt=""
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MessageUser;
