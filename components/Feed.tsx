"use client"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Modal from "./ui/Modal"
import { useTaskContext } from "@/context/TaskContext"

const Feed = () => {
    const session = useSession()
    const userId = (session?.data?.user as any)?.id
    const [openModals, setOpenModals] = useState<string[]>([])
    const { state, fetchTasks } = useTaskContext()

    useEffect(() => {
        fetchTasks('GET', `api/task/${userId}/alltask`)
    }, [])

    // console.log(session);

    // Function to toggle the visibility of a modal based on its ID
    // then we pass the task id to the open modal array
    // the modal is then opened if its in the modal array
    const toggleModal = (taskId: string) => {
        setOpenModals(prevIds => {
            if (prevIds.includes(taskId)) {
                //close an already open modal
                return []
            } else {
                // Open modal if not already open
                return [taskId]
            }
        })
    }

    return (
        <div className=" flex flex-col items-center space-y-3 mb-20">
            {
                state.data?.map((task, index) => {
                    const { taskDdl: deadline, taskDesc: description, taskPnt: points, status, _id: id, pickedBy, creator, createdAt } = task
                    //@ts-ignore
                    const isCurrentUserCreator = creator?._id === (session?.user)?.id
                    return (
                        <div className="text-gray-800 flex justify-between items-center w-11/12 bg-[#dfd7fb] rounded-xl">

                            < TaskCard
                                deadline={deadline}
                                description={description}
                                points={points}
                                status={status}
                                pickedBy={pickedBy}
                                key={index}
                                createdAt={createdAt}
                            />

                            <div className=" p-2">
                                <div>
                                    {
                                        openModals.includes(id) && (
                                            <div className="">
                                                <Modal taskId={id}
                                                    onClose={() => toggleModal(id)} deadline={deadline} points={points} description={description} status={status}
                                                    pickedBy={pickedBy} createdAt={createdAt} creator={creator}

                                                />
                                            </div>
                                        )
                                    }
                                </div>

                                <button
                                    className='bg-[#ffff] px-5 py-2 rounded-xl text-sm text-[#6229b3] font-medium'
                                    onClick={() => toggleModal(id)}
                                    disabled={task.status === "Completed"}
                                >
                                    View Task
                                </button>
                            </div>
                        </div>
                    )
                })}
        </div >
    )
}

export default Feed
