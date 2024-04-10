"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"
import Image from "next/image"
import ongoingchore from "@/public/images/ongoingchore.png"
import { Montserrat } from "next/font/google"
import { useTaskContext } from "@/context/TaskContext"

const montserrat = Montserrat({ subsets: ["latin"] });

const CompletedTask = ({ setActiveTab }) => {
    const { data: session } = useSession()
    const [userTask, setUserTask] = useState()
    const { state, fetchTasks } = useTaskContext()
    //@ts-ignore
    const userId = session?.user?.id
    //@ts-ignore
    const userRole = session?.user?.role

    useEffect(() => {
        fetchTasks("GET", `api/tasks/${userId}/completed`)

    }, [])


    return (
        <div>
            {
                state.data?.map(task => {
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
            {
                state.data && state.data?.length === 0 && (
                    <div className="flex items-center flex-col justify-center">
                        <Image src={ongoingchore} height={200} alt="a kid sweeping" />
                        {
                            userRole === "parent" ? (
                                <p className={`${montserrat.className} text-center font-medium text-gray-600`}>
                                    No task has been completed yet.
                                </p>
                            ) : (
                                <>
                                    <p className={`${montserrat.className} text-center font-medium text-gray-600`}>
                                        You currently have no ongoing task, pick a task to earn some points
                                    </p>
                                    < button className="bg-[#6229b3] text-white px-4 py-2 rounded mt-4" onClick={() => setActiveTab("new")}>
                                        Pick a Task
                                    </button>
                                </>
                            )
                        }

                    </div>

                )
            }
        </div>
    )
}

export default CompletedTask