"use client"
import useSocket from '@/context/useSocket';
import { FormatTimeDifference } from '@/lib/FormatTime';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import parent from "@/public/images/parent.png";

const FullscreenImageModal = ({ image, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="relative">
            <img src={image} alt="Fullscreen" className="max-w-full max-h-full" />
            <button onClick={onClose} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
        </div>
    </div>
);
const CommentReply = ({ taskId }) => {
    const [messages, setMessages] = useState([]);
    const { data: session } = useSession();
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const userId = (session?.user as any)?.id;

    useEffect(() => {
        if (taskId) {
            const fetchComment = async () => {
                try {
                    const res = await fetch(`api/comments/${taskId}`);
                    if (!res.ok) {
                        throw new Error("No Data found");
                    }
                    const data = await res.json();
                    setMessages(data);
                } catch (error) {
                    console.log(error.message);
                }
            };
            fetchComment();
        }
    }, [taskId]);
    const handleSentImage = (image) => {
        setFullscreenImage(image);
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        setIsFullscreen(false);
        setFullscreenImage(null);
    };

    return (
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.map((dm, index) => {
                const { message, createdAt, creator, image } = dm;
                const childName = dm["childId"]?.username;
                const parentName = dm["parentId"]?.username;
                const childImage = dm["childId"]?.image;

                const isCurrentUserMessage = creator === userId;

                return (
                    <div key={index} className={`flex ${isCurrentUserMessage ? "justify-end" : "justify-start"}`}>
                        <div className="flex items-start space-x-2">
                            {childImage && (
                                <Image src={isCurrentUserMessage ? childImage : parent} alt={childName || "Child"} width={30} height={30} className="rounded-full" />
                            )}
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-900 text-sm font-semibold capitalize">
                                        {isCurrentUserMessage ? childName : parentName}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        {FormatTimeDifference(createdAt)}
                                    </span>
                                </div>
                                {
                                    dm.image && <div className="">
                                        <img
                                            src={dm.image}
                                            alt="comment"
                                            height={300}
                                            width={100}
                                            onClick={() => handleSentImage(dm.image)}
                                            className='cursor-pointer'
                                        />
                                    </div>
                                }
                                <p className={`text-gray-800 text-sm mt-1 ${isCurrentUserMessage ? "text-right" : "text-left"}`}>{message}</p>
                            </div>
                        </div>
                        {isFullscreen && (
                            <FullscreenImageModal image={fullscreenImage} onClose={closeFullscreen} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CommentReply;
