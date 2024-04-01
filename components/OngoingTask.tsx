"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"
import { Montserrat } from "next/font/google";
import ongoingchore from "@/public/images/ongoingchore.png"
import Image from "next/image";


const montserrat = Montserrat({ subsets: ["latin"] });

const OngoingTask = ({ setActiveTab }) => {
    const session = useSession()
    const [ongoingTask, setOngoingTask] = useState()
    const [userTask, setUserTask] = useState()
    const userId = session?.data?.user?.id

    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`api/tasks/${userId}/inprogress`)
            if (res.ok) {
                const data = await res.json()
                setOngoingTask(data)
            }
        }
        fetchTask()
    }, [])
    return (
        <div className="w-full">
            {
                ongoingTask?.map(task => {
                    const { taskDesc, taskDdl, taskPnt, status, createdAt } = task
                    return < TaskCard
                        description={taskDesc}
                        deadline={taskDdl}
                        points={taskPnt}
                        status={status}
                        createdAt={createdAt} />
                }
                )
            }
            {
                ongoingTask && ongoingTask?.length === 0 && (
                    <div className="flex items-center flex-col justify-center">
                        <Image src={ongoingchore} height={200} alt="a kid sweeping" />
                        <p className={`${montserrat.className} text-center font-medium text-gray-600`}>You currently have no ongoing task, pick a task to earn some points</p>
                        < button className="bg-[#6229b3] text-white px-4 py-2 rounded mt-4" onClick={() => setActiveTab("new")}>
                            Pick a Task
                        </button>
                    </div>

                )
            }
        </div>
    )
}

export default OngoingTask