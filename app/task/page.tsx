'use client'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Task from "@/components/Task"
import TaskCard from '@/components/TaskCard'


const page = () => {
    const searchParams = useSearchParams()
    const taskId = searchParams.get("id")
    const session = useSession()
    const [task, setTask] = useState()
    const [picked, setPicked] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()

    // const isCurrentUserCreator = creator._id === session?.user?.id


    useEffect(() => {
        const fetchTask = async () => {
            try {
                if (taskId) {
                    const res = await fetch(`api/task/${taskId}/etask`)
                    if (!res.ok) {
                        throw new Error('Failed to fetch task')
                    }
                    const data = await res.json()
                    setTask(data)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [taskId])


    const handleStatus = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: "In Progress",
                    userId: session?.data?.user?.id
                })
            })
            if (resp.ok) {
                setPicked(true)
                console.log("Status successfully changed");
            } else {
                throw new Error('Failed to update task status')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCompleted = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: "PATCH",
                body: JSON.stringify({ status: "Completed", userId: session?.data })
            })
            if (resp.ok) {
                setPicked(true)
                setCompleted(true)
                router.push("/")
                console.log("Status successfully completed");
            } else {
                throw new Error('Failed to update task status')
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (loading) {
        return <div>Loading...</div>
    }

    const acceptTask = async () => {
        try {
            const res = await fetch(`/api/task/${taskId}/acceptTask`, {
                method: "PATCH",
            });

            if (res.ok) {
                console.log("Task accepted successfully");
            } else {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error("Error accepting task:", error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>
    }

    const isCreator = task?.[0].creator === session?.data?.user?.id
    // console.log(task[0]);

    return (
        <div className='gap-5'>
            <TaskCard
                description={task?.[0].taskDesc}
                status={task?.[0].status}
                pickedBy={task?.[0].pickedBy}
            />

            {
                isCreator ? <div>
                    <button className='bg-green-500 p-4'
                    onClick={acceptTask}
                    >Good Job</button>
                </div> :

                    <div>
                        <button
                            className='bg-red-500 p-4'
                            onClick={handleStatus}
                        // disabled={picked}
                        >
                            {picked ? "Task Picked!" : "Pick Task"}
                        </button>

                        {
                            picked &&
                            <div>
                                <p>
                                    If done please press completed
                                </p>
                                <button
                                    // disabled={completed}
                                    className='bg-green-500 p-4 ' onClick={handleCompleted}>
                                    Completed
                                </button>
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default page