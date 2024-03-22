"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"


const CompletedTask = () => {
    const session = useSession()
    const [userTask, setUserTask] = useState()
    const userId = session?.data?.user?.id

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`api/tasks/${userId}/inprogress`)
            const data = await res.json()
            // const filteredData = data.filter(task => task.user == taskId)
            console.log(data);
        }

        fetchTask()
    }, [])


    return (
        <div>CompletedTask</div>
    )
}

export default CompletedTask