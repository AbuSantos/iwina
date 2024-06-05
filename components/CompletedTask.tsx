"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "./TaskCard"
import Image from "next/image"
import ongoingchore from "@/public/images/ongoingchore.png"
import { Montserrat } from "next/font/google"
import { useTaskContext } from "@/context/TaskContext"
import { TaskType } from "@/types/types"
const montserrat = Montserrat({ subsets: ["latin"] });

const CompletedTask = ({ setActiveTab }) => {
    const { data: session, status } = useSession()
    const { state, fetchTasks } = useTaskContext()
    const [data, setData] = useState([])
    const userId = (session?.user as any)?.id
    const userRole = (session?.user as any)?.role
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    interface TaskType {
        taskDesc: string,
        taskDdl: string,
        taskPnt: number,
        status: string,
        createdAt: Date,
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch(`api/tasks/${userId}/completed?role=${userRole}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const newData = await res.json();
                setData(newData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchTasks();
        }
    }, [userId, userRole]);
    if (loading) {
        return <div className="flex justify-center items-center p-2 ">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center p-2 ">Error: {error}</div>;
    }
    console.log(data)

    return (
        <div className=" flex flex-col items-center space-y-3 p-2">
            {
                data?.map((task: TaskType) => {
                    // console.log(task);
                    const { taskDesc, taskDdl, taskPnt, status, createdAt } = task
                    return (
                        <div className="text-gray-800 flex justify-between items-center w-11/12 bg-[#dfd7fb] rounded-xl">
                            < TaskCard
                                description={taskDesc}
                                deadline={taskDdl}
                                points={taskPnt}
                                status={status}
                                createdAt={createdAt}
                            />
                        </div>)
                })
            }
            {
                data && data?.length === 0 && (
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
                                        You currently have no completed task, pick a task to earn some points
                                    </p>
                                    < button className="bg-[#6229b3] text-white px-4 py-2 rounded mt-4" onClick={() => setActiveTab("new")}>
                                        Pick a Task
                                    </button>
                                </>
                            )
                        }
                    </div>
                )}
        </div>
    )
}

export default CompletedTask