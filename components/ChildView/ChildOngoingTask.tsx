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


type ChildIdType = {
    childId: String
}
const montserrat = Montserrat({ subsets: ["latin"] });

const ChildOngoingTask = ({ childId, data, role }) => {
    const { state, fetchTasks } = useTaskContext()
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchTasks("GET", `api/tasks/${childId}/inprogress`)
    }, [childId]);

    // Return loading indicator while fetching data
    if (state.loading) return <p>Loading...</p>;
    // console.log(state.data);

    const handleModal = () => {
        setOpenModal((prev) => !prev)
    }
    return (
        <div className={`border-2 bg-[#dfd7fb] font-medium rounded-xl py-2 px-3 w-11/12`}>
            <div>
                {state.data?.map((task) => (
                    <>
                        <TaskCard
                            key={task._id} // Make sure to include a unique key for each TaskCard
                            status={task.status}
                            description={task.taskDesc}
                            deadline={task.taskDdl}
                            points={task.taskPnt}
                            createdAt={task.createdAt}
                        />
                        <div className=" w-full ">
                            <InputSlider />
                        </div>


                        <div className="flex items-center justify-around mt-6">
                            {
                                role === "child" ?
                                    <button className="flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-2 px-5 rounded-lg " onClick={handleModal}>
                                        <AiOutlineComment />
                                        <span className="ml-2 text-sm">
                                            Comment
                                        </span>
                                    </button> : <button className="flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-2 px-5 rounded-lg ">
                                        🕝
                                        <span className="ml-2 text-sm">
                                            Remind
                                        </span>
                                    </button>

                            }

                            {
                                openModal && <CommentModal setOpenModal={setOpenModal} />
                            }

                        </div>
                    </>
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

