"use client"
import { useTaskContext } from '@/context/TaskContext';
import useSocket from '@/context/useSocket';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { IoImagesOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const MessageForm = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const inputRef = useRef(null)
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()
    // console.log(session, "sesion");

    //@ts-ignore
    const userId = session?.user?.id
    //@ts-ignore
    const role = session?.user?.role

    // Create a ref for the socket connection
    const socketRef = useRef<Socket | null>(null);
    // console.log(socketRef);
    const socket = useSocket("http://localhost:8080")
    const familyRoomId = role === "parent" ? userId : state.data?.[0]?.creator

    useEffect(() => {
        if (socket) {
            console.log("socket connected");
            if (familyRoomId && userId) {
                socketRef.current.emit("join-room", userId, familyRoomId);
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
        socketRef.current = io("http://localhost:8080");

        // Set up the event listener for receiving messages
        socketRef.current.on("receive-message", (message: string,) => {
            console.log("message", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup function to remove the event listener and disconnect the socket
        return () => {
            if (socketRef.current) {
                // socketRef.current.off("receive-message");
                socketRef.current.disconnect();
            }
        };
    }, []);

    // Function to handle sending messages
    const sendMessage = async (e) => {
        e.preventDefault()
        // Check that there is a nonempty message and socket is present
        if (socketRef.current && currentMessage && familyRoomId && userId) {
            await socketRef.current.emit("send-message", currentMessage, familyRoomId, userId);
            setCurrentMessage("")
        }
    };

    return (
        <div >
            <div className='pb-16 '>
                {messages?.map((message, index) => (
                    <div>
                        <p key={index} className='rounded-tr-[2rem] rounded-tl-[2rem] rounded-bl-[2rem] text-[#dfd7fb] bg-[#6229b3] text-sm w-[95%] m-auto  px-2'>{message}</p>
                    </div>
                ))}
            </div>

            <div style={{
                position: 'fixed',
                bottom: 0, left: 0, right: 0, zIndex: 999,
                cursor: 'pointer',
            }}>

                <form onSubmit={(e) => sendMessage(e)}>
                    <div className="flex items-center px-3 py-2  bg-gray-50 dark:bg-gray-700">
                        <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <IoImagesOutline />
                            <span className="sr-only">Upload image</span>
                        </button>
                        <button type="button" className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                            <MdOutlineEmojiEmotions />
                            <span className="sr-only">Add emoji</span>
                        </button>
                        <textarea id="chat" onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} rows={1} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border   dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white outline-none" placeholder="Your message..."></textarea>
                        <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
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

