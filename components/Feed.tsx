"use client"
import { useEffect, useState } from "react"
import TaskCard from "./TaskCard"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Modal from "./ui/Modal"
import { useTaskContext } from "@/context/TaskContext"
import SingleCard from "./ui/SingleCard"
import Image from "next/image"
import nochores from "@/public/images/nochores.png"
import SingleCardSkeleton from "./skeletons/SingleCardSkeleton"

const Feed = () => {
    const session = useSession()
    const userId = (session?.data?.user as any)?.id
    const [openModals, setOpenModals] = useState<string[]>([])
    const { state, fetchTasks } = useTaskContext()

    useEffect(() => {
        fetchTasks('GET', `api/task/${userId}/alltask`)
    }, [])

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

    if (state.loading) {
        < SingleCardSkeleton />
    }
    return (
        <>
            <div className="  flex items-center  space-y-2 overflow-x-auto no-scrollbar">

                {
                    state.data?.map((task, index) => {
                        const { taskDdl: deadline, taskDesc: description, taskPnt: points, status, _id: id, pickedBy, creator, createdAt } = task
                        //@ts-ignore
                        const isCurrentUserCreator = creator?._id === (session?.user)?.id
                        return (
                            <div className="text-gray-800 rounded-xl">
                                < SingleCard
                                    deadline={deadline}
                                    description={description}
                                    points={points}
                                    status={status}
                                    pickedBy={pickedBy}
                                    key={index}
                                    createdAt={createdAt}
                                    mode="feed"
                                    onOpen={() => toggleModal(id)}
                                />

                                <div className=" p-2">
                                    <div>
                                        {
                                            openModals.includes(id) && (
                                                <div className="">
                                                    <Modal taskId={id}
                                                        onClose={() => toggleModal(id)}
                                                        deadline={deadline} points={points} description={description} status={status}
                                                        pickedBy={pickedBy} createdAt={createdAt} creator={creator}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                        )
                    })}



            </div >
            <div className="flex justify-center items-center">
                {
                    state.data.length === 0 &&
                    <div className="flex flex-col justify-center items-center p-5 w-full">
                        <Image src={nochores} alt="no chores" width={150} />
                        <p className="text-center text-lg  text-gray-500 font-medium ">
                            No Task yet
                        </p>
                    </div>
                }
            </div>
        </>

    )
}

export default Feed
