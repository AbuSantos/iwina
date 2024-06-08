"use client"
import { Messages } from '@/(models)/Message'
import useSocket from '@/context/useSocket'
import { SessionUser } from '@/types/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { IoImagesOutline } from 'react-icons/io5'
import { MdOutlineEmojiEmotions } from 'react-icons/md'


const CommentForm = ({ taskId, user, creator }) => {
    const [currentMessage, setCurrentMessage] = useState("")
    const [messages, setMessage] = useState([])
    const [isPreviousMessage, setIsPreviousMessage] = useState<boolean>(false);
    const [scrollIntoViewBool, setScrollIntoViewBool] = useState(null)
    const messageContainerRef = useRef<HTMLDivElement>(null)
    const { data: session } = useSession()
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    const [commentImage, setCommentImage] = useState()
    const [previewImage, setPreviewImage] = useState()

    const socket = useSocket("http://localhost:8080")
    const commentRoomId = taskId
    const userId = (session?.user as SessionUser)?.id
    const role = (session?.user as SessionUser)?.role

    const sendMessage = (e) => {
        e.preventDefault()
        // Check that there is a nonempty message and socket is present

        if (socket && currentMessage && user && creator && commentRoomId && userId) {
            socket.emit("send-comment", currentMessage, user, creator, commentRoomId, userId, commentImage);
            setCurrentMessage("")
        }
    };
    
    useEffect(() => {
        if (messages.length > 0) {
            const isLastMessage = messages[messages.length - 1];
            setScrollIntoViewBool(isLastMessage);
        }
    }, [messages]);
    useEffect(() => {
        if (scrollIntoViewBool) {
            const messageElement = messageContainerRef.current;
            messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [scrollIntoViewBool]);

    useEffect(() => {
        if (socket) {
            if (socket && user && creator && commentRoomId) {
                socket.emit("join-comment", user, creator, commentRoomId)
            } else {
                console.log("you cannot join this room")
            }
        }
    }, [socket, user, commentRoomId, creator])


    useEffect(() => {
        // Initialize the socket connection once
        if (socket) {
            // Set up the event listener for receiving messages
            socket.on('receive-comment', (message, user, parent, commentRoomIds,
                userIds, images) => {
                setMessage((prevMessages) => [...prevMessages, { message, user, parent, commentRoomIds, userIds, images }]);
            });
        }
    }, [socket]);

    const handleCameraClick = () => {
        const inputElement = document.getElementById("cameraInput")
        if (inputElement) {
            inputElement.click();
            console.log(inputElement);
        } else {
            console.error("Camera input element not found");
        }
    }

    const handleCameraInputChange = async (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = async () => {
                await uploadFile(file)
            }
            if (reader.readyState === FileReader.EMPTY) {
                reader.readAsDataURL(file);
            } else {
                console.error('FileReader is busy reading another file.');
            }
        }
        console.log(file)
    }

    const uploadFile = async function (file: any) {
        try {
            const data = new FormData()
            data.append('file', file)

            const res = await fetch(`api/upload`, {
                method: 'POST',
                body: data
            })

            if (res.ok) {
                const data = await res.json()
                setCommentImage(data.url)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    console.log(commentImage);


    return (
        <div  >

            <div ref={messageContainerRef} style={{ overflowY: 'auto', maxHeight: '100%' }} >
                {
                    messages.map((message, index) => {
                        console.log(message)
                        return (
                            <div>

                                <p key={index} className='text-gray-900 text-sm'>
                                    {message.message}
                                </p>
                                {
                                    // commentImage &&
                                    // <img src={commentImage} alt="comment" height={50} width={60} />
                                }
                            </div>

                        )
                    })
                }
            </div>


            <div style={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0, zIndex: 999,
                cursor: 'pointer',
            }} className=''>

                <form onSubmit={(e) => sendMessage(e)}>
                    <div className="flex items-center px-3 py-2  bg-gray-50 dark:bg-gray-600">
                        <div onClick={handleCameraClick}>
                            <input
                                id="cameraInput"
                                type="file"
                                accept="image/*"
                                capture="environment"
                                style={{ display: 'none' }}
                                onChange={handleCameraInputChange}
                            />
                            <IoImagesOutline />
                        </div>

                        <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <MdOutlineEmojiEmotions />
                            <span className="sr-only">Add emoji</span>
                        </button>

                        <textarea
                            id="chat" onChange={(e) => setCurrentMessage(e.target.value)}
                            value={currentMessage} rows={1}
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border   dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none"
                            placeholder="Your message..."
                            disabled={role !== "parent" && userId !== id}
                        >
                        </textarea>

                        <button type="submit" className="inline-flex justify-center p-2 text-[#9a78c9] rounded-full cursor-pointer hover:bg-blue-100 dark:text-[#dfd7fb] dark:hover:bg-gray-600">
                            <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                            </svg>
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CommentForm