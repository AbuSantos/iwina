"use client"
import { useTaskContext } from '@/context/TaskContext';
import useSocket from '@/context/useSocket';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

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

    const joinRoomR = () => {
        if (userId && familyRoomId) {
            socketRef.current.emit("join-room", userId, familyRoomId);
        } else {
            console.log("User or Room ID is missing");
        }
    }

    // Function to handle sending messages
    const sendMessage = async () => {
        // Check that there is a nonempty message and socket is present
        if (socketRef.current && currentMessage && familyRoomId && userId) {
            await socketRef.current.emit("send-message", currentMessage, familyRoomId, userId);
            setCurrentMessage("")
        }
    };

    return (
        <div>
            <div>
                {messages?.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <div>

                <input
                    type="text"
                    value={currentMessage}
                    placeholder='messages'
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none placeholder-gray-400'
                />
                {/* <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required /> */}

                <div className='flex justify-around items-end'>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default MessageForm

