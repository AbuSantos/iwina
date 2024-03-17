"use client"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { useRouter } from "next/navigation"


const Feed = () => {
    const [tasks, setTasks] = useState([])
    const router = useRouter()
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('api/task')
            const data = await res.json()
            setTasks(data)
        }
        fetchTasks()
    }, [])
    return (
        <>
            {
                tasks.map((task, index) => {
                    console.log(task);
                    const { taskDdl: deadline, taskDesc: description, taskPnt: points, status, _id: id, pickedBy } = task
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
                            <button className='bg-green-600 p-2 mb-3' onClick={() => router.push(`/task?id=${id}`)}>View Task</button>
                        </div>
                    )
                }
                )
            }
        </>

    )


}

export default Feed
