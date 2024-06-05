import { useTaskContext } from '@/context/TaskContext'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import TaskCard from '../TaskCard'
import { RiGiftLine } from 'react-icons/ri'
import { IoClose } from "react-icons/io5";
import SingleCard from './SingleCard'

interface ModalProps {
    taskId: string;
    onClose: () => void;
    points: number
    deadline: string
    description: string
    status: string
    pickedBy: string
    createdAt: Date
    creator: {}
}

// const Modal = ({ taskId, deadline, points }: ModalProps) => {
const Modal = ({ taskId, onClose, points, deadline, description, status, pickedBy, createdAt, creator }: ModalProps) => {

    const session = useSession()
    const [task, setTask] = useState()
    const [picked, setPicked] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const router = useRouter()
    const { state, fetchTasks } = useTaskContext()

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
                // onClose();
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
                onClose();
                console.log("Status successfully completed");
            } else {
                throw new Error('Failed to update task status')
            }
        } catch (error) {
            console.log(error)
        }
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
                    const updatedTasks = state.data.filter((t: any) => t._id !== taskId);
                    setTask(updatedTasks);
                    onClose();

                    // window.location.reload()
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
                onClose();
                router.refresh()
                console.log("Point successfully sent");
            } else {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error("Error accepting task", error);
        }
    };

    //@ts-ignore
    const isCreator = creator._id === (session?.data?.user as any)?.id
    // console.log(isCreator, creator);

    const isCompleted = status === "Completed" || "Rewarded"
    const isRewarded = status === "Rewarded"
    const isNotStarted = status === "Not Started"
    const isInProgress = status === "In Progress"

    return (
        <div className={`fixed bottom-20 left-0 right-0 z-50 w-full  dark:bg-gray-700 flex items-end justify-center p-4 slide-In rounded-tl-3xl  rounded-tr-3xl `} data-modal-backdrop="static">
            <div className="relative p-4 w-full max-w-2xl max-h-full text-gray-200 bg-[#dfd7fb] rounded-tl-3xl  rounded-tr-3xl ">

                <span className='text-gray-900 flex justify-end text-lg cursor-pointer' onClick={onClose}>
                    <IoClose />
                </span>

                <SingleCard
                    description={description}
                    status={status}
                    pickedBy={pickedBy}
                    createdAt={createdAt}
                    deadline={deadline as unknown as Date}
                    points={points}
                    mode="modal"
                />

                {
                    isCreator ?
                        <div className="flex flex-col space-y-2 ">
                            <button className='bg-[#6229b3] p-4 '
                                onClick={acceptTask}
                                disabled={isRewarded}
                            >
                                {
                                    isRewarded ? "Rewarded" :
                                        <div className='flex justify-center items-center  '>
                                            <RiGiftLine style={{ fontSize: "20px" }} />
                                            <span className='ml-2'>Reward</span>
                                        </div>
                                }
                            </button>
                            {
                                isNotStarted && <button className='bg-red-500 p-4' onClick={handleDelete}>
                                    Delete task
                                </button>
                            }
                        </div> :

                        <div className="flex mb-3 justify-around">
                            <div>
                                {
                                    isInProgress ?
                                        <button
                                            disabled={completed}
                                            className='bg-green-300 p-4 w-44 text-green-900' onClick={handleCompleted}>
                                            Completed
                                        </button> : <button
                                            className='bg-red-500 p-4 text-sm'
                                            onClick={handleStatus}
                                            disabled={picked}
                                        >
                                            {picked ? "Task Picked!" : "Pick Task"}
                                        </button>
                                }
                            </div>
                        </div>
                }
            </div>
        </div >
    )
}



export default Modal