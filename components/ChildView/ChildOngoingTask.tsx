"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "@/components/TaskCard"
import { Montserrat } from "next/font/google";
import ongoingchore from "@/public/images/ongoingchore.png"
import Image from "next/image";
import { AiOutlineComment } from "react-icons/ai";
// import "@/styles/Ongoing.module.css"
import InputSlider from "./InputSlider";


type ChildIdType = {
    childId: String
}
const montserrat = Montserrat({ subsets: ["latin"] });

const ChildOngoingTask = ({ childId, data }) => {
    const { data: session } = useSession();
    console.log(session);

    const [ongoingTask, setOngoingTask] = useState();
    const [loading, setLoading] = useState(true);
    const userRole = session?.user?.role;
    console.log(userRole);


    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`api/tasks/${childId}/inprogress`);
            if (res.ok) {
                const data = await res.json();
                setOngoingTask(data);
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };
        fetchTask();
    }, []);

    // Return loading indicator while fetching data
    if (loading) return <p>Loading...</p>;

    return (
        <div className={`border-2 bg-[#dfd7fb] font-medium rounded-xl py-2 px-3 w-11/12`}>
            <div>
                {ongoingTask?.map((task) => (
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
                            <button className="flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-2 px-5 rounded-lg ">
                                <AiOutlineComment />
                                <span className="ml-2 text-sm">
                                    Comment
                                </span>
                            </button>
                            <button className="flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-2 px-5 rounded-lg ">
                                🕝
                                <span className="ml-2 text-sm">
                                    Remind
                                </span>
                            </button>
                        </div>
                    </>
                ))}


            </div>

            <div>
                {ongoingTask && ongoingTask.length === 0 && (
                    <div className="flex items-center flex-col justify-center">
                        <Image src={ongoingchore} height={200} alt="a kid sweeping" />
                        <p className={`${montserrat.className} text-center font-medium text-gray-400`}>
                            {data?.username} currently has no ongoing tasks
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChildOngoingTask;

