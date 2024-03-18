"use client"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const Feed = () => {
    const [tasks, setTasks] = useState([])
    const { data: session } = useSession()
    // console.log(session?.data.user?.id, "Session");

    const router = useRouter()
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('api/task')
            const data = await res.json()
            setTasks(data)
        }
        fetchTasks()
    }, [])


    const acceptedTasks = async () => {
        try {
            
        } catch (error) {
            
        }
    }
    return (
        <>
            {
                tasks.map((task, index) => {
                    // console.log(task);
                    const { taskDdl: deadline, taskDesc: description, taskPnt: points, status, _id: id, pickedBy, creator } = task
                    const isCurrentUserCreator = creator._id === session?.user?.id
                    return (
                        <div>

                            < TaskCard
                                deadline={deadline}
                                description={description}
                                points={points}
                                status={status}
                                pickedBy={pickedBy}
                                key={index}
                            // id={id}
                            />
                            <div className="space-x-4">
                                {
                                    isCurrentUserCreator && <button className="bg-green-600 p-2 ">accept </button>
                                }

                                <button
                                    className='bg-green-600 p-2 mb-3'
                                    onClick={() => router.push(`/task?id=${id}`)}>View Task</button>
                            </div>
                        </div>
                    )
                }
                )
            }
        </>

    )


}

export default Feed
