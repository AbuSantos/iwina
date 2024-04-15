"use client"
import { useTaskContext } from '@/context/TaskContext';
import { useSession } from 'next-auth/react';
// import { useState } from "react"
// import Input from "./Input"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import MessageCard from './MessageCard';

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
    const socketRef = useRef<SocketIOClient.Socket | null>(null);
    // console.log(socketRef.current?.id);

    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])

    // console.log(state.data)
    const familyRoomId = role === "parent" ? userId : state.data?.[0]?.creator
    console.log(familyRoomId);

    useEffect(() => {
        // Initialize the socket connection once
        socketRef.current = io("http://localhost:8080");
        // Join the family room
        // socketRef.current.emit('join-room', familyRoomId, userId);

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

                {/* <MessageCard userId={familyRoomId} /> */}
            </div>
            {/* Input field for sending new messages */}
            <input
                type="text"
                value={currentMessage}
                placeholder='messages'
                onChange={(e) => setCurrentMessage(e.target.value)}
                className='border border-gray-800 '
            />
            <input
                className='border border-gray-800 '
                type="text" ref={inputRef}
                placeholder='room name'
                //@ts-ignore
                value={inputRef.current?.value ? inputRef.current.value : ""}
            />

            {/* Button to submit the new message */}
            <div className='flex justify-around items-center'>
                <button onClick={sendMessage}>Send</button>
                <button onClick={joinRoomR}>Join Room</button>
            </div>
        </div>
    );
}

export default MessageForm

