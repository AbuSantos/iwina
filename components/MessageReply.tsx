"use client"

import { useTaskContext } from "@/context/TaskContext"
import { formatTime } from "@/lib/FormatTime"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const MessageReply = () => {
    const [messages, setMessages] = useState()
    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()
    const userName = session?.user?.name
    const userId = session?.user?.id;
    const role = session?.user?.role
    // console.log(session);
    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])



    const familyRoomId = role === "parent" ? userId : state.data?.[0]?.creator

    console.log(familyRoomId, state.data?.[0]?.creator);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`api/groupchat/${familyRoomId}/allmessage`);
                // console.log(res);
                if (!res.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data = await res.json();
                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
                // Handle the error, e.g., show a notification to the user
            }
        }
        fetchMessages()
    }, [userId, familyRoomId])
    console.log(messages);

    return (
        <div>
            {
                messages?.map(dm => {
                    console.log(dm);

                    const { _id, message, createdAt, child, parent } = dm
                    let isCurrentUserMessage
                    if (parent || child === session?.user?.id) {
                        isCurrentUserMessage = true
                    }
                    console.log(isCurrentUserMessage);



                    return (
                        <div key={_id}>
                            <p
                                className={`text-${isCurrentUserMessage ? "right" : "left"} ${isCurrentUserMessage ? "text-blue-600" : "text-gray-600"
                                    }`}
                            >
                                {message} from
                                <span className="text-[0.8rem] text-gray-600"> {userName} at {formatTime(createdAt)}</span>
                            </p>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default MessageReply