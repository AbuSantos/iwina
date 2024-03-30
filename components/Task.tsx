import Link from "next/link";
import TaskCard from "./TaskCard";
import { useState } from "react";



const Task = ({ }) => {
    // const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState("new");
    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <div className="flex space-x-2 w-full items-center text-[0.8rem]">
                <button
                    onClick={() => handleTabChange("new")}
                    className={`border-2 bg-[#dfd7fb] ml-2 font-medium rounded-xl py-2 px-4 ${activeTab === "new" ? "border-[#6229b3] text-[#6229b3]" : "border-[#6329b346] text-[#6329b362]"
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

            <div className="mt-10  prompt_layout ">
                {
                    activeTab === 'new' && <p>new task</p>

                }
                {
                    activeTab === 'ongoing' && <p>ongoing task</p>

                }
                {
                    activeTab === 'completed' && <p>completed task</p>

                }
            </div>
        </section >
    )
}

export default Task