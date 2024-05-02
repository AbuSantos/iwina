"use client"

import { useTaskContext } from "@/context/TaskContext"
import { formatTime } from "@/lib/FormatTime"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const MessageReply = () => {
    const [messages, setMessages] = useState([])
    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()

    const userName = (session?.user as any)?.name
    const userId = (session?.user as any)?.id;
    const role = (session?.user as any)?.role

    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])

    const familyRoomId = role === "parent" ? userId : state.data?.[0]?.creator

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`api/groupchat/${familyRoomId}/allmessage`);
                if (!res.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }
        fetchMessages()
    }, [userId, familyRoomId])
    // console.log(messages);

    return (
        <div className="p-2   mx-auto ">
            {
                messages?.map((dm) => {
                    const { _id, message, createdAt, creator } = dm
                    let isCurrentUserMessage: boolean
                    if (creator === userId) {
                        isCurrentUserMessage = true
                    }

                    return (
                        <div key={_id} className={`mb-2 ${isCurrentUserMessage ? "text-right" : "text-left"}`}>
                            <div className={`flex ${isCurrentUserMessage ? "justify-end" : "justify-start"}`}>
                                <div className={`overflow-hidden 
                                ${isCurrentUserMessage ? "rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl text-[#dfd7fb] bg-[#6229b3]" : "rounded-3xl bg-gray-200 text-gray-900"
                                    }`}
                                    style={{ maxWidth: '80%' }}>
                                    <p className="p-2 text-[0.85rem]">
                                        {message}
                                    </p>
                                    {/* <span className="text-[0.6rem] text-gray-600">{formatTime(createdAt)}</span> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default MessageReply