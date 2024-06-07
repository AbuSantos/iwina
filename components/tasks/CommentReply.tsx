"use client"
import useSocket from '@/context/useSocket';
import { FormatTimeDifference } from '@/lib/FormatTime';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import parent from "@/public/images/parent.png";

const CommentReply = ({ taskId }) => {
    const [messages, setMessages] = useState([]);
    const { data: session } = useSession();

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

    return (
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {messages.map((dm, index) => {
                const { message, createdAt, creator } = dm;
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
                                <p className={`text-gray-800 text-sm mt-1 ${isCurrentUserMessage ? "text-right" : "text-left"}`}>{message}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CommentReply;
