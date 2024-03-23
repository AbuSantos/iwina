"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"


const CompletedTask = () => {
    const session = useSession()
    const [userTask, setUserTask] = useState()
    const userId = session?.data?.user?.id

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`api/tasks/${userId}/completed`)
            if (res.ok) {
                const data = await res.json()
                setUserTask(data)
            }
            // const filteredData = data.filter(task => task.user == taskId)
            // console.log(data);
        }

        fetchTask()
    }, [])


    return (
        <div>
            {
                userTask?.map(task => {
                    // console.log(task);
                    const { taskDesc, taskDdl, taskPnt, status, createdAt } = task
                    return < TaskCard
                        description={taskDesc}
                        deadline={taskDdl}
                        points={taskPnt}
                        status={status}
                        createdAt={createdAt}
                    />
                }
                )
            }
        </div>
    )
}

export default CompletedTask