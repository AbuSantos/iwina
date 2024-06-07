"use client"

import { useTaskContext } from "@/context/TaskContext"
import { formatTime } from "@/lib/FormatTime"
import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react"

const MessageReply = () => {
    const [messages, setMessages] = useState([])
    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()
    const [scrollIntoViewBool, setScrollIntoViewBool] = useState<boolean>(false)

    const userId = (session?.user as any)?.id;
    const role = (session?.user as any)?.role

    const messageContainerRef = useRef<HTMLDivElement>(null)

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
   
    useEffect(() => {
        if (messages.length > 0) {
            const isLastMessage = messages[messages.length - 1]
            setScrollIntoViewBool(isLastMessage)
        }
        if (!scrollIntoViewBool) return;
        const messageElement = messageContainerRef.current;
        messageElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, scrollIntoViewBool]);

   


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
                        <div key={_id} className={`mb-2 ${isCurrentUserMessage ? "text-right" : "text-left"}`} ref={messageContainerRef} style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                            <div className={`flex ${isCurrentUserMessage ? "justify-end" : "justify-start"}`}>
                                <div className={`overflow-hidden 
                                ${isCurrentUserMessage ? 
                                    "rounded-tr-3xl rounded-tl-3xl rounded-bl-3xl text-[#dfd7fb] bg-[#6229b3]" : "rounded-3xl bg-[#dfd7fb] text-[#6229b3]"
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