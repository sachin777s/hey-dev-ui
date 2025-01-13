import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Avatar, Button } from "@nextui-org/react";
import { ImCross } from "react-icons/im";
import { FaImage } from "react-icons/fa6";
import { IoMdVideocam } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import { BsDot, BsEmojiSmile } from "react-icons/bs";

function CreateReplyModal({ setIsOpen, otherUser, post }) {
  const modalRef = useRef(null);

  const [text, setText] = useState("");
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const pickerRef = useRef(null);

  //Hiding Modal on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

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

  //Displaying Selected Image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (file.type.startsWith("image")) {
          setSelectedImage(reader.result);
          setSelectedVideo(null);
        } else {
          setSelectedVideo(reader.result);
          setSelectedImage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //Handling post reply
  const handlePostReply = () => {};

  const modalContent = (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center backdrop-brightness-50 z-[9999]">
      <div
        ref={modalRef}
        className="px-2 sm:px-4 py-4 max-w-[700px] max-h-[70%] border border-color rounded-lg bg-white dark:bg-black"
      >
        <div className="flex items-start gap-2">
          <div className="flex flex-col items-center">
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <div className="h-full w-[1px] bg-white"></div>
          </div>
          <div className="flex items-start gap-1 flex-col">
            <div className="flex items-center">
              <span className="font-semibold">Abhishek Jh***</span>
              <BsDot />
              <span className="opacity-70 text-sm">@abhi9867</span>
            </div>
            <p className="">
              {`Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquid consequuntur nihil temporibus.Lorem ipsum dolor
                      sit, amet consectetur adipisicing elit. Aliquid
                      consequuntur nihil temporibus.Lorem ipsum dolor sit, amet
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Aliquid consequuntur nihil temporibus.Lorem ipsum dolor
                      sit, amet consectetur adipisicing elit. Aliquid
                      consequuntur nihil temporibus.Lorem ipsum dolor sit, amet`.slice(
                0,
                240
              )}
              ......
            </p>
            <div className="flex items-center gap-1">
              <span className="text-sm opacity-70">Replying to</span>
              <span className="text-blue-700">@sachin777s</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          <div className="w-full">
            <textarea
              className="mt-1 p-2 w-full bg-transparent border border-color rounded-lg focus:outline-none resize-none overflow-hidden"
              placeholder="Reply on this post..."
              maxLength={1000}
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="mt-4 w-full">
              {selectedImage && (
                <div className="relative">
                  <div className="w-[32px] h-[32px] p-2 bg-black text-white rounded-full absolute top-4 right-4 font-bold">
                    <ImCross onClick={() => setSelectedImage(null)} />
                  </div>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="mx-auto max-w-full max-h-96 rounded-2xl"
                  />
                </div>
              )}
              {selectedVideo && (
                <div className="w-full relative">
                  <div
                    onClick={() => setSelectedVideo(null)}
                    className="w-[32px] h-[32px] p-2 bg-black text-white rounded-full absolute top-4 right-4 font-bold cursor-pointer z-[999]"
                  >
                    <ImCross />
                  </div>
                  <video controls autoPlay className="w-full">
                    <source src={selectedVideo} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
            <div className="mt-1 flex items-center justify-between text-[var(--main-color)]">
              <div className="flex items-center justify-start gap-4">
                <div>
                  <label htmlFor="image-upload">
                    <FaImage size={20} />
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
                <div>
                  <label htmlFor="video-upload">
                    <IoMdVideocam size={20} />
                  </label>
                  <input
                    onChange={handleFileChange}
                    id="video-upload"
                    name="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                  />
                </div>
                <div className="flex relative">
                  <div
                    ref={pickerRef}
                    className={`${
                      isEmojiPickerVisible ? "hidden sm:block" : "hidden"
                    } absolute top-6 left-0 -translate-x-1/3 md:translate-x-0 z-50`}
                  >
                    <EmojiPicker
                      theme={
                        document.body.classList.contains("dark")
                          ? "dark"
                          : "light"
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
                  onClick={handlePostReply}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default CreateReplyModal;
