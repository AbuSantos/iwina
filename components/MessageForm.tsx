"use client"
// import { useState } from "react"
// import Input from "./Input"
// import { useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const MessageForm = () => {
    const [messages, setMessages] = useState<string[]>([]);
    // const messages: string[] = []
    // State to store the current message
    const [currentMessage, setCurrentMessage] = useState('');
    const inputRef = useRef(null)

    // Create a ref for the socket connection
    const socketRef = useRef<SocketIOClient.Socket | null>(null);
    console.log(socketRef);


    useEffect(() => {
        // Initialize the socket connection once
        socketRef.current = io("http://localhost:8080");

        // Set up the event listener for receiving messages
        socketRef.current.on("receive-message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup function to remove the event listener and disconnect the socket
        return () => {
            if (socketRef.current) {
                socketRef.current.off("receive-message");
                socketRef.current.disconnect();
            }
        };
    }, []);

    // Function to handle sending messages
    const sendMessage = () => {
        if (socketRef.current && currentMessage) {
            socketRef.current.emit("send-message", currentMessage);
            setCurrentMessage("");
        }
    };




    const joinRoom = () => {
        if (inputRef.current) {
            console.log(inputRef.current?.value);
        }
    }


    // const sendMessage = () => {
    //     // Send the message to the server
    //     const socket = io("http://localhost:8080");

    //     // socket.emit('message', currentMessage);
    //     socket.emit("send-message", currentMessage)
    //     // Clear the currentMessage state
    //     setCurrentMessage('');
    // };

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
                onChange={(e) => setCurrentMessage(e.target.value)}
                className='border border-gray-800 '
            />
            <input
                className='border border-gray-800 '
                type="text" ref={inputRef}
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

