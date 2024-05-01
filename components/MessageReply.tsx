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
        <div className="p-2">
            {
                messages?.map((dm) => {
                    console.log(dm)
                    const { _id, message, createdAt, child, parent, creator } = dm
                    let isCurrentUserMessage: boolean
                    if (creator === userId) {
                        isCurrentUserMessage = true
                    }

                    return (
                        <div key={_id} className="bg-[#dfd7fb] pb-3 mb-2 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl" >
                            <p
                                className={`p-4
                                 text-${isCurrentUserMessage ? "right" : "left"} 
                                    ${isCurrentUserMessage ? "text-blue-600 " : "text-gray-600 "
                                    }`
                                }
                            >
                                {message} from
                                <span className="text-[0.8rem text-gray-600">
                                    {userName} at {formatTime(createdAt)}
                                </span>
                            </p>

                        </div>
                    )

                })
            }
        </div>
    )
}

export default MessageReply