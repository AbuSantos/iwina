"use client"
import { useTaskContext } from '@/context/TaskContext';
import useSocket from '@/context/useSocket';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const MessageForm = () => {
    const [messages, setMessages] = useState([]);
    const [isSender, setIsSender] = useState<boolean>(false);
    const [isPreviousMessage, setIsPreviousMessage] = useState<boolean>(false);
    const [scrollIntoViewBool, setScrollIntoViewBool] = useState(null)

    const [currentMessage, setCurrentMessage] = useState('');
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()
    const messageContainerRef = useRef<HTMLDivElement>(null)

    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role

    // Create a ref for the socket connection
    const socket = useSocket("http://localhost:8080")
    const familyRoomId = role === "parent" ? userId : state.data?.[0]?.creator

    useEffect(() => {
        if (socket) {
            if (familyRoomId && userId) {
                socket.emit("join-room", userId, familyRoomId);
            } else {
                console.log("User or Room ID is missing");
            }
        }
    }, [socket, userId, familyRoomId])

    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])


    useEffect(() => {
        // Initialize the socket connection once
        if (socket) {
            // Set up the event listener for receiving messages
            socket.on("receive-message", (message: string, senderID: number) => {
                // console.log("message", message, senderID);
                setIsSender(userId === senderID)
                setMessages((prevMessages) => [...prevMessages, { message, senderID }]);
            });
        }
    }, [socket]);

    // Function to handle sending messages
    const sendMessage = async (e) => {
        e.preventDefault()
        // Check that there is a nonempty message and socket is present
        if (socket && currentMessage && familyRoomId && userId) {
            await socket.emit("send-message", currentMessage, familyRoomId, userId);
            setCurrentMessage("")
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            const isLastMessage = messages[messages.length - 1];
            // if (isLastMessage?.senderID === messages[messages.length - 2].senderID) {

            //     // console.log(isLastMessage.senderID);
            // }
            setScrollIntoViewBool(isLastMessage);
            // setIsPreviousMessage(true)
        }
    }, [messages]);

    useEffect(() => {
        if (scrollIntoViewBool) {
            const messageElement = messageContainerRef.current;
            messageElement.scrollIntoView({ behavior: "smooth", block: "end" });

            const secondMessage = messages[messages.length - 2];
            console.log(secondMessage, scrollIntoViewBool);

            // if (
            //     //checking if the second message and the recent message are the same sender
            //     scrollIntoViewBool?.senderID === secondMessage?.senderID
            // ) {
            //     setIsPreviousMessage(true);
            // }
        }
        console.log(isPreviousMessage);
    }, [scrollIntoViewBool]);



    return (
        <div >
            <div className='pb-16 p-2  ' ref={messageContainerRef} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                {messages?.map(({ message, senderID }, index, messaged) => {

                    return (
                        <div key={index} className={`mb-2 ${senderID === userId ? "text-right" : "text-left"}`}>
                            <div className={`flex ${senderID === userId ? "justify-end" : "justify-start"}`}>
                                <div className={`overflow-hidden 
                                ${senderID === userId ? "rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl text-[#dfd7fb] bg-[#6229b3]" : "rounded-3xl bg-[#dfd7fb] text-[#6229b3]"
                                    }`}
                                    style={{ maxWidth: '80%' }}>
                                    <p className="p-2 text-[0.85rem]">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div style={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0, zIndex: 999,
                cursor: 'pointer',
            }}>

                <form onSubmit={(e) => sendMessage(e)}>
                    <div className="flex items-center px-3 py-2  bg-gray-50 dark:bg-gray-600">

                        <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <IoImagesOutline />
                            <span className="sr-only">Upload image</span>
                        </button>

                        <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <MdOutlineEmojiEmotions />
                            <span className="sr-only">Add emoji</span>
                        </button>

                        <textarea id="chat" onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} rows={1} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border   dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Your message..."></textarea>

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
    );
}

export default MessageForm

