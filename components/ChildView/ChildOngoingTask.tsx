"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "@/components/TaskCard"
import { Montserrat } from "next/font/google";
import ongoingchore from "@/public/images/ongoingchore.png"
import Image from "next/image";

type ChildIdType = {
    childId: String
}
const montserrat = Montserrat({ subsets: ["latin"] });

const ChildOngoingTask = ({ childId, data }) => {
    const { data: session } = useSession();
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
        <div className={`border-2 bg-[#dfd7fb] font-medium rounded-xl py-2 px-4 w-11/12`}>
            {ongoingTask?.map((task) => (
                <TaskCard
                    key={task._id} // Make sure to include a unique key for each TaskCard
                    status={task.status}
                    description={task.taskDesc}
                    deadline={task.taskDdl}
                    points={task.taskPnt}
                    createdAt={task.createdAt}
                />
            ))}
            {ongoingTask && ongoingTask.length === 0 && (
                <div className="flex items-center flex-col justify-center">
                    <Image src={ongoingchore} height={200} alt="a kid sweeping" />
                    <p className={`${montserrat.className} text-center font-medium text-gray-400`}>
                        {data?.username} currently has no ongoing tasks
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChildOngoingTask;

