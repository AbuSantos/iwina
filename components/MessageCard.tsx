"use client"
import { useTaskContext } from "@/context/TaskContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react"

const MessageCard = ({ familyRoomId }) => {
    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()
    //@ts-ignore
    const userId = session?.user?.id

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch(`api/groupchat/${familyRoomId}/allmessage`)
            if (res.ok) {
                console.log(res)
            }
        }
        fetchMessages()
    }, [userId])

    return (
        <div>MessageCard</div>
    )
}

export default MessageCard