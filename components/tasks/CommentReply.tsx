"use client"
import useSocket from '@/context/useSocket';
import React, { useEffect, useState } from 'react'

const CommentReply = () => {
    const socket = useSocket("http://localhost:8080")
    const [message, setMessage] = useState([])
    useEffect(() => {
        // Initialize the socket connection once
        if (socket) {
            // Set up the event listener for receiving messages
            socket.on("receive-comment", (message: string,) => {
                console.log("message");
                // setIsSender(userId === senderID)
                setMessage((prevMessages) => [...prevMessages, { message }]);
            });
        }
    }, [socket]);
    return (
        <div>{message}</div>
    )
}

export default CommentReply