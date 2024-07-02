"use client"
import { useState, useEffect } from "react";
import OngoingTask from "./OngoingTask";
import CompletedTask from "./CompletedTask";
import Feed from "./Feed";
import { useSession } from "next-auth/react";
import { useTaskContext } from "@/context/TaskContext";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";
import spinner from "@/public/images/spinner.gif"



const Task = ({ }) => {
    const { data: session } = useSession()
    const userId = (session?.user as any)?.id
    const { state, fetchTasks } = useTaskContext()
    const { data, errorMessage, loading } = useFetch(`api/task/${userId}/alltask`)
    const [activeTab, setActiveTab] = useState("new");
    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    // useEffect(() => {
    //     fetchTasks("GET", `api/task/${userId}/alltask`)
    // }, [userId])


    return (
        <section className="w-full flex flex-col items-center justify-center">
            <div className="flex space-x-2 w-full items-center text-[0.8rem]">
                <button
                    onClick={() => handleTabChange("new")}
                    className={`border-2 bg-[#dfd7fb] ml-[0.3rem] font-medium rounded-xl py-2 px-4 ${activeTab === "new" ? "border-[#6229b3] text-[#6229b3]" : "border-[#6329b346] text-[#6329b362]"
                        }`}>New Tasks</button>
                <button
                    onClick={() => handleTabChange("ongoing")}
                    className={`border-2 bg-[#dfd7fb] font-medium rounded-xl  py-2 px-4 ${activeTab === "ongoing" ? "border-[#6229b3] text-[#6229b3]" : "border-[#6329b346] text-[#6329b362]"
                        }`}>Ongoing Task</button>
                <button
                    onClick={() => handleTabChange("completed")}
                    className={`border-2 bg-[#dfd7fb] font-medium rounded-xl py-2 px-4 ${activeTab === "completed" ? "border-[#6229b3] text-[#6229b3]" : "border-[#6329b346] text-[#6329b362]"
                        }`}>Completed Tasks</button>
            </div>

            <div className=" w-full ">
                {
                    activeTab === 'new' &&
                    <div >
                        <Feed />
                    </div>
                }
                {
                    activeTab === 'ongoing' && <OngoingTask setActiveTab={setActiveTab} />
                }
                {
                    activeTab === 'completed' && <CompletedTask setActiveTab={setActiveTab} />
                }
            </div>
        </section >
    )
}

export default Task