"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import TaskCard from "@/components/TaskCard"
import Image from "next/image"
import ongoingchore from "@/public/images/ongoingchore.png"
import { Fredoka, Montserrat } from "next/font/google"
import { FormatTimeDifference, formatTime } from '@/lib/FormatTime'
import { IoGiftOutline } from "react-icons/io5";
import { useRouter } from "next/navigation"

const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] });

const ChildViewCompletedTask = ({ childId, role }) => {
    const router = useRouter()
    const session = useSession()
    const [userTask, setUserTask] = useState()
    const [reward, setReward] = useState(true)
    const userId = (session?.data?.user as any)?.id
    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch(`api/tasks/${childId}/completed`)
            if (res.ok) {
                const data = await res.json()
                setUserTask(data)
            }
        }

        fetchTask()
    }, [])
    const handleReward = async (taskId: string) => {
        try {
            const res = await fetch(`/api/task/${taskId}/acceptTask`, {
                method: "PATCH",
            });

            if (res.ok) {
                router.refresh()
                console.log("Point successfully sent");
                setReward(false)
            } else {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error("Error accepting task:", error);
        }
    };
    return (
        <div className={`border-2 bg-[#a191fe] font-medium rounded-xl py-2 px-3 w-11/12`}>
            {
                (userTask as [])?.map((task: any) => {
                    // console.log(reward);

                    const { taskDesc, taskDdl, taskPnt, status, updatedAt, _id } = task

                    return (
                        <div className="flex justify-between gap-5 items-center text-gray-200 ">
                            <div
                                className=" flex items-center space-x-8"
                            >
                                <div className="flex flex-col ">
                                    <p className="text-[0.8rem] text-gray-300 ml-4 ">
                                        {status}
                                    </p>
                                    <h3 className={`${fredoka.className} text-gray-200 ml-4 font-medium text-lg capitalize `}>
                                        {taskDesc}
                                    </h3>

                                    <div className='flex mt-2 font-medium  space-x-3'>
                                        <p className="text-[0.8rem] ml-3 ">
                                            ⭐️ {taskPnt}
                                        </p>
                                        <span className={`${montserrat.className} text-[0.8rem] font-medium `}>  🕝 {FormatTimeDifference(updatedAt)}</span>
                                    </div>
                                </div>

                                <div>
                                    <button className="flex items-center justify-center bg-[#dfd7fb] text-[#6229b3] py-2 px-5 rounded-lg "
                                        onClick={() => handleReward(_id)}
                                        disabled={!reward}
                                    >
                                        <IoGiftOutline />
                                        <span className="ml-2 text-sm">
                                            {reward ? "Reward" : "Rewarded"}
                                        </span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
                }
                )
            }
            {
                userTask && (userTask as [])?.length === 0 && (
                    <div className="flex items-center flex-col justify-center">
                        <Image src={ongoingchore} height={200} alt="a kid sweeping" />
                        <p className={`${montserrat.className} text-center font-medium text-gray-600`}>
                            {`
                            ${role === "parent" ? `${userTask[0]?.username} currently have no completed task` :
                                    "You currently have no completed task, pick a task to earn some points"}
                            `}
                        </p>
                    </div>

                )
            }
        </div>
    )
}

export default ChildViewCompletedTask