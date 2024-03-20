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

    // console.log(tasks);

    const handleDelete = async (id) => {
        console.log(id);

        // const  hasConfirmed = confirm('Are you sure you want to delete')
        // if (hasConfirmed) {
        try {
            const res = await fetch(`api/task/${id}/etask`, {
                method: "DELETE"
            })
            if (res.ok) {
                // Remove the deleted task from the local state
                const updatedTasks = tasks?.filter(t => t._id !== id);
                setTasks(updatedTasks);
                router.refresh()
                console.log("Successfully deleted task");
            }
        } catch (error) {
            console.log(error);
        }
        // }
    }


    return (
        <>
            {
                tasks.map((task, index) => {
                    // console.log(task);
                    const { taskDdl: deadline, taskDesc: description, taskPnt: points, status, _id: id, pickedBy, creator, createdAt } = task
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
                                createdAt={createdAt}
                            // id={id}
                            />
                            <div className="space-x-4">
                                {
                                    isCurrentUserCreator &&
                                    <div className="mb-3 space-x-3">
                                        <button className='bg-red-500 p-4' onClick={() => handleDelete(id)}>
                                            Delete task
                                        </button>
                                        {/* <button className="bg-green-600 p-2 "
                                            onClick={() => acceptTask(id)}>
                                            accept
                                        </button> */}
                                    </div>

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
