"use client"
import { useTaskContext } from '@/context/TaskContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TaskCard from '../TaskCard'

interface ModalProps {
    taskId: string;
    onClose: () => void;
    points: number
    deadline: string
}

// const Modal = ({ taskId, deadline, points }: ModalProps) => {
const Modal = ({ taskId, onClose, points, deadline }: ModalProps) => {

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
                    //@ts-ignore
                    userId: session?.data?.user?.id
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
                body: JSON.stringify({ status: "Completed", userId: session?.data?.user?.id })
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

    // if (state.loading) {
    //     return <div>Loading...</div>
    // }


    const handleDelete = async () => {
        const hasConfirmed = confirm('Are you sure you want to delete')
        if (hasConfirmed) {
            try {
                const res = await fetch(`api/task/${taskId}/etask`, {
                    method: "DELETE"
                })
                if (res.ok) {
                    // Remove the deleted task from the local state
                    const updatedTasks = task?.filter(t => t._id !== taskId);
                    setTask(updatedTasks);
                    router.push("/")
                    console.log("Successfully deleted task");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const acceptTask = async () => {
        try {
            const res = await fetch(`/api/task/${taskId}/acceptTask`, {
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

    // if (error) {
    //     return <div>Error: {error}</div>
    // }

    const isCreator = state.data?.[0]?.creator === session?.data?.user?.id
    console.log(isCreator);


    return (
        <div className={`fixed bottom-20 left-0 right-0 z-50 w-full  dark:bg-gray-700 flex items-end justify-center p-4 slide-In`} data-modal-backdrop="static">
            <div className="relative p-4 w-full max-w-2xl max-h-full text-gray-200 bg-gray-100">
                <TaskCard
                    description={state.data?.[0]?.taskDesc}
                    status={state.data?.[0]?.status}
                    pickedBy={state.data?.[0]?.pickedBy}
                    createdAt={state.data?.[0]?.createdAt}
                    deadline={deadline as unknown as Date}
                    points={points}
                />

                {
                    isCreator ?
                        <div className="flex flex-col">
                            <button className='bg-green-500 p-4'
                                onClick={acceptTask}
                            >Reward
                            </button>
                            <button className='bg-red-500 p-4' onClick={handleDelete}>
                                Delete task
                            </button>
                        </div> :

                        <div className="flex ">
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
        </div>

    )
}



export default Modal