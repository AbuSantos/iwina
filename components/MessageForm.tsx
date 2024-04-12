"use client"
import { useTaskContext } from '@/context/TaskContext';
import { useSession } from 'next-auth/react';
// import { useState } from "react"
// import Input from "./Input"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const MessageForm = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const inputRef = useRef(null)
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()
    const [kids, setKids] = useState()
    console.log(session, "sesion");

    const userId = session?.user?.id
    const role = session?.user?.role

    // Create a ref for the socket connection
    const socketRef = useRef<SocketIOClient.Socket | null>(null);
    console.log(socketRef.current?.id);

    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/${userId}/user/kids?role=${role}`);
            if (res.ok) {
                const data = await res.json()
                // console.log(data);
                setKids(data)
            }
        }
        fetchKids()
    }, [userId, role])

    console.log(kids, "kids");

    useEffect(() => {
        // Initialize the socket connection once
        socketRef.current = io("http://localhost:8080");
        console.log(socketRef.current.id);

        // Set up the event listener for receiving messages
        socketRef.current.on("receive-message", (message: string,) => {
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
    const sendMessage = () => {
        console.log("Room value:");
        // Check that there is a nonempty message and socket is present
        if (socketRef.current && currentMessage) {
            socketRef.current.emit("send-message", currentMessage)
            setCurrentMessage("")
        }
    };

    const joinRoom = () => {
        if (inputRef.current) {
            console.log(inputRef.current?.value);
        }
    }

    return (
        <div>

            <div>
                {messages?.map((message, index) => (

                    <p key={index}>{message}</p>
                ))}
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
                <button onClick={joinRoom}>Join Room</button>
            </div>
        </div>
    );
}

export default MessageForm

