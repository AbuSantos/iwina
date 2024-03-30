import Link from "next/link";
import TaskCard from "./TaskCard";
import { useState } from "react";



const Task = ({ }) => {
    // const { data: session } = useSession()
    const [activeTab, setActiveTab] = useState("new");
    return (
        <section className="w-full flex flex-col items-center justify-center">
            <div className="flex space-x-2 w-11/12 items-center text-[0.8rem] ">
                <button
                    onClick={(prev) => setActive(true)}
                    className="border-2 border-[#6229b3] bg-[#dfd7fb] text-[#6229b3] font-medium  rounded-xl pb-2 pl-3 pr-3 pt-2">New Tasks</button>
                <button
                    className="border-2 border-[#6329b346] bg-[#dfd7fb] text-[#6329b362] font-medium  rounded-xl p-2 ">Ongoing Task</button>
                <button className="border-2 border-[#6329b346] bg-[#dfd7fb] 
                text-[#6329b362] font-medium  rounded-xl p-2">Completed Tasks</button>
            </div>

            {/* <p className="desc text-left">{desc}</p> */}
            <div className="mt-10  prompt_layout ">
                {
                    active ? <p> New Task</p> : <p>ongoing task</p>

                }
            </div>
        </section >
    )
}

export default Task