"use client"
import { useTaskContext } from "@/context/TaskContext";
import { useSession } from "next-auth/react";
import { useEffect } from "react"

const MessageCard = () => {
    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()
    //@ts-ignore
    const userId = session?.user?.id

    useEffect(() => {
        fetchTasks("GET", `api/groupchat/${userId}/allmessage`);
    }, [userId])
    console.log(state.data);

    return (
        <div>MessageCard</div>
    )
}

export default MessageCard