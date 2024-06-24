"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "@/components/TaskCard"
import { Montserrat } from "next/font/google";
import ongoingchore from "@/public/images/ongoingchore.png"
import Image from "next/image";
import { AiOutlineComment } from "react-icons/ai";
import InputSlider from "./InputSlider";
import { useTaskContext } from "@/context/TaskContext";
import CommentModal from "../tasks/CommentModal";
import { SessionUser, TaskType } from "@/types/types";
import spinner from "@/public/images/spinner.gif"


type ChildIdType = {
    childId: String
}
const montserrat = Montserrat({ subsets: ["latin"] });

const ChildOngoingTask = ({ childId, data }) => {
    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()
    const role = (session?.user as SessionUser)?.role
    useEffect(() => {
        fetchTasks("GET", `api/tasks/${childId}/inprogress`)
    }, [childId]);
    if (state.loading) return <div className='flex items-center justify-center'>
        <Image src={spinner} alt="loaiding state" width={100} />
    </div>;


    return (
        <div className={`font-medium  py-2 px-3 w-11/12`}>
            <div className="">
                {state.data?.map((task) => (
                    < div className="mt-4 rounded-xl  bg-[#dfd7fb] p-3" >
                        <TaskCard
                            key={task._id} // Make sure to include a unique key for each TaskCard
                            status={task.status}
                            description={task.taskDesc}
                            deadline={task.taskDdl}
                            points={task.taskPnt}
                            createdAt={task.createdAt}
                            role={role}
                            taskId={task._id}
                            user={task.user}
                            creator={task.creator}
                        />
                        <div className=" w-full ">
                            <InputSlider />
                        </div>
                    </div>
                ))}


            </div>

            <div>
                {state.data && state.data.length === 0 && (
                    <div className="flex items-center flex-col justify-center">
                        <Image src={ongoingchore} height={200} alt="a kid sweeping" />
                        <p className={`${montserrat.className} text-center font-medium text-gray-400`}>
                            {`${role === "parent" ? `${data?.username} currently has no ongoing task` : "you currently have no ongoing task"} `}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildOngoingTask;

