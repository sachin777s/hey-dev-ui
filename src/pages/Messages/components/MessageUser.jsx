import { Avatar, Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useRef, useState } from 'react'
import { BsDot, BsDownload, BsEmojiSmile } from 'react-icons/bs';
import { FaImage } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Link, useParams } from 'react-router-dom';

const MessageUser = () => {

    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const emojiRef = useRef(null);
    const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [modalImage, setModalImage] = useState(null);

    const sampleMessages = [
        {
            id: 1,
            message: "hey",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            id: 2,
            message: "hello",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: false,
            repliedId: null
        },
        {
            id: 3,
            message: "kya hal hai?",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            id: 4,
            message: "badhiya",
            date: "12 MARCH",
            imageUrl: "https://i.ibb.co/gDzLWJs/Screenshot-from-2024-11-16-23-14-37.png",
            isIncomming: false,
            repliedId: 3
        },
        {
            message: "tu bta ?",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: false,
            repliedId: null
        },
        {
            message: "main bhi badhiya hu👍",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kya kar rha hai abhi",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: false,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: false,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "https://pbs.twimg.com/media/GFgZ9ayWkAAGP12?format=jpg&name=small",
            isIncomming: false,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "https://pbs.twimg.com/media/FoSPJApaYAAl0h0?format=jpg&name=240x240",
            isIncomming: false,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: true,
            repliedId: null
        },
        {
            message: "kuchh nhi, kya karu",
            date: "12 MARCH",
            imageUrl: "",
            isIncomming: false,
            repliedId: null
        }
    ]

    // Hiding Emoji Picker onClick Outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
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
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const messageImageClickHandler = (i) => {

        setModalImage(sampleMessages[i].imageUrl)
        onOpen();
    }

    return (
        <div className="h-full">
            <div className='px-2 sm:px-34 h-[calc(100vh-120px)] overflow-y-scroll scrollbar-hide md:scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray'>
                <div className='mt-4 flex flex-col items-center'>
                    <Avatar
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                        className="w-20 h-20 text-large"
                    />
                    <span className='text-2xl'>
                        {"Sachin Kumar"}
                    </span>
                    <span className='text-xl opacity-70'>
                        {"@sachin777sk"}
                    </span>
                </div>

                {/* Chat section */}
                <div className='mt-4 flex flex-col gap-1'>
                    {
                        sampleMessages.map((_, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`max-w-[60%] flex flex-col ${_.isIncomming ? "self-start items-start" : "self-end items-end"}`}
                                >
                                    <span className={`py-2 px-4 ${_.isIncomming ? "rounded-[100px_100px_100px_0] bg-[#282934] text-white" : "rounded-[100px_100px_0_100px] bg-[var(--main-color)] text-black"}`}>
                                        {_.message}
                                    </span>
                                    <div className="mt-1 w-full">
                                        <img
                                            onClick={() => messageImageClickHandler(i)}
                                            className='w-full min-w-[14rem]'
                                            src={_.imageUrl}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* Message input section */}
            <div className='relative flex flex-col'>
                <div className={`px-2 sm:px-4 w-full bg-white dark:bg-black absolute bottom-[50px] ${selectedImage ? "block" : "hidden"} shadow-[-6px_-8px_19px_-13px_gray]`}>
                    <div className='relative'>
                        <div className='w-[22px] h-[22px] bg-black text-white rounded-full flex items-center justify-center absolute top-4 right-4'>
                            <ImCross size={12} onClick={() => setSelectedImage(null)} />
                        </div>
                        <img className={`${selectedImage ? "h-[160px]" : "h-0"}`} src={selectedImage} alt="" />
                    </div>
                </div>
                <div className='px-2 sm:px-4 h-[50px] border-t-[0.5px] border-color flex items-center justify-center flex-col'>
                    <div className='w-full flex items-center justify-center gap-4'>
                        {/* Emoji */}
                        <div className='flex relative'>
                            <div
                                ref={emojiRef}
                                className={`${isEmojiPickerVisible ? "block" : "hidden"} absolute bottom-6 left-1/2 z-10`}
                            >
                                <EmojiPicker onEmojiClick={(emoji) => setPostInput((prev) => prev + emoji.emoji)} />
                            </div>
                            <BsEmojiSmile
                                color='var(--main-color)'
                                onClick={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
                                size={20} />
                        </div>
                        {/* Image Input */}
                        <div>
                            <label htmlFor="image-upload">
                                <FaImage color='var(--main-color)' size={20} />
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
                        {/* Message Input */}
                        <div className='w-full relative'>
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                type="text"
                                placeholder='Start Message...'
                                className='w-full border-none outline-none pl-4 pr-10 py-2 rounded-full'
                            />
                            <IoMdSend
                                color='var(--main-color)'
                                size={28}
                                className='absolute right-1 top-[6px]'
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Message Image Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='full'
                hideCloseButton
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex gap-4 relative">
                                <div className='flex items-center'>
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                                    <span className='ml-2 font-bold'>{"Alina"}</span>
                                    <BsDot />
                                    <span className='font-normal'>{"@alina8987"}</span>
                                </div>
                                <Link download={modalImage}>
                                    <Button isIconOnly>
                                        <BsDownload size={18} />
                                    </Button></Link>
                                <Button
                                    isIconOnly
                                    onPress={onClose}
                                    className='rounded-full absolute right-4 md:right-8'
                                >
                                    <RxCross2 size={22} />
                                </Button>
                            </ModalHeader>
                            <ModalBody className=''>
                                <img
                                    className='max-h-[90vh] object-contain'
                                    src={modalImage}
                                    alt=""
                                />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default MessageUser