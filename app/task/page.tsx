'use client'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Task from "@/components/Task"
import TaskCard from '@/components/TaskCard'
import Notification from '@/components/Notification'
import { toast } from 'react-toastify'
import { useTaskContext } from '@/context/TaskContext'



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
    const { state, fetchTasks } = useTaskContext()

    useEffect(() => {
        fetchTasks('GET', `api/task/${taskId}/etask`);
    }, [taskId])


    const handleStatus = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: "In Progress",
                    userId: (session?.data?.user as any)?.id
                })
            })
            if (resp.ok) {
                setPicked(true);
                router.refresh();
                console.log("Status successfully changed");
            } else {
                if (resp.status === 500) {
                    alert("You cannot pick more than 2 tasks");
                }
                throw new Error('Failed to update task status');
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleCompleted = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: "PATCH",
                body: JSON.stringify({ status: "Completed", userId: (session?.data?.user as any)?.id })
            })
            if (resp.ok) {
                setPicked(true)
                setCompleted(true)
                console.log("Status successfully completed");
            } else {
                throw new Error('Failed to update task status')
            }
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(state.data);

    if (state.loading) {
        return <div>Loading...</div>
    }


    const handleDelete = async () => {
        const hasConfirmed = confirm('Are you sure you want to delete')
        if (hasConfirmed) {
            try {
                const res = await fetch(`api/task/${taskId}/etask`, {
                    method: "DELETE"
                })
                if (res.ok) {
                    // Remove the deleted task from the local state
                    const updatedTasks = state.data?.filter(t => t._id !== taskId);
                    setTask(updatedTasks);
                    router.refresh()
                    console.log("Successfully deleted task");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const acceptTask = async () => {
        try {
            const res = await fetch(`/api/task/${taskId}/accepttask`, {
                method: "PATCH",
            });

            if (res.ok) {
                router.refresh()
                console.log("Point successfully sent");
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

    const isCreator = state.data?.[0]?.creator === (session?.data?.user as any)?.id
    // console.log(isCreator);


    return (
        <div className='gap-5 bg-slate-900'>
            <TaskCard
                description={state.data?.[0]?.taskDesc}
                status={state.data?.[0]?.status}
                pickedBy={state.data?.[0]?.pickedBy}
                createdAt={state.data?.[0]?.createdAt}
                deadline={state.data?.[0]?.deadline}
            />

            {
                isCreator ?
                    <div>
                        <button className='bg-green-500 p-4'
                            onClick={acceptTask}
                        >Reward
                        </button>
                        <button className='bg-red-500 p-4' onClick={handleDelete}>
                            Delete task
                        </button>
                    </div> :

                    <div >
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