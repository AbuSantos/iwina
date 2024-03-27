"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"


const OngoingTask = () => {
    const session = useSession()
    const [ongoingTask, setOngoingTask] = useState()
    const [userTask, setUserTask] = useState()
    const userId = session?.data?.user?.id

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`api/tasks/${userId}/inprogress`)
            if (res.ok) {
                const data = await res.json()
                setOngoingTask(data)
            }
        }
        fetchTask()
    }, [])


    return (
        <div>
            {
                ongoingTask?.map(task => {

                    const { taskDesc, taskDdl, taskPnt, status, createdAt } = task
                    return < TaskCard
                        description={taskDesc}
                        deadline={taskDdl}
                        points={taskPnt}
                        status={status}
                        createdAt={createdAt} />
                }
                )
            }
        </div>
    )
}

export default OngoingTask