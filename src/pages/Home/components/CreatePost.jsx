import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button } from '@nextui-org/react'
import { BsEmojiSmile } from 'react-icons/bs'
import { IoMdVideocam } from 'react-icons/io'
import { FaImage, FaLocationDot } from "react-icons/fa6";
import EmojiPicker from 'emoji-picker-react';
import { ImCross } from 'react-icons/im';

const CreatePost = () => {

    const [postInput, setPostInput] = useState("");
    const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const pickerRef = useRef(null);

    // Hiding Emoji Picker onClick Outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setEmojiPickerVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //Displaying Selected Image
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (file.type.startsWith('image')) {
                    setSelectedImage(reader.result);
                    setSelectedVideo(null);
                } else {
                    setSelectedVideo(reader.result)
                    setSelectedImage(null);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='mt-4 px-2 sm:px-4 flex items-start gap-4'>
            <div>
                <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
            </div>
            <div className='w-full'>

                <textarea
                    maxLength={288}
                    value={postInput}
                    onChange={(e) => setPostInput(e.target.value)}
                    id="tweetBox"
                    placeholder="What's happening?"
                    class="w-full bg-transparent border-none focus:outline-none resize-none text-xl overflow-hidden"
                    rows="3"
                >
                </textarea>

                <div className='w-full'>
                    {selectedImage && (
                        <div className='relative'>
                            <div className='w-[32px] h-[32px] p-2 bg-black text-white rounded-full absolute top-4 right-4 font-bold'>
                                <ImCross onClick={() => setSelectedImage(null)} />
                            </div>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className='w-full rounded-2xl'
                            />
                        </div>
                    )}
                    {selectedVideo && (
                        <div className='w-full relative'>
                            <div className='w-[32px] h-[32px] p-2 bg-black text-white rounded-full absolute top-4 right-4 font-bold'>
                                <ImCross onClick={() => setSelectedVideo(null)} />
                            </div>
                            <video controls autoPlay className='w-full'>
                                <source src={selectedVideo} type="video/mp4" />
                            </video>
                        </div>
                    )}

                </div>

                <div className='w-[90%] border-b-[0.5px] border-[var(--primary-border)]'></div>

                <div className='mt-4 flex items-center justify-between text-[var(--main-color)]'>
                    <div className='flex items-center justify-start gap-4'>
                        <div>
                            <label htmlFor="image-upload">
                                <FaImage size={20} />
                            </label>
                            <input
                                onChange={handleFileChange}
                                id='image-upload'
                                name='image-upload'
                                type="file"
                                accept='image/*'
                                className='hidden'
                            />
                        </div>
                        <div>
                            <label htmlFor="video-upload">
                                <IoMdVideocam size={20} />
                            </label>
                            <input
                                onChange={handleFileChange}
                                id='video-upload'
                                name='video-upload'
                                type="file"
                                accept='video/*'
                                className='hidden'
                            />
                        </div>
                        <div className='flex relative'>
                            <div ref={pickerRef} className={`${isEmojiPickerVisible ? "block" : "hidden"} absolute top-6 left-1/2 z-10`}>
                                <EmojiPicker onEmojiClick={(emoji) => setPostInput((prev) => prev + emoji.emoji)} />
                            </div>
                            <BsEmojiSmile
                                onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
                                size={20} />
                        </div>
                        <div>
                            <FaLocationDot className='opacity-50' size={20} />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span>{postInput.length}/288</span>
                        <Button
                            isDisabled={!postInput}
                            className='bg-[var(--main-color)] text-black'
                            radius='full'>
                            Post
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePost