import { FormatTimeDifference, formatTime } from '@/lib/FormatTime'
import { Fredoka, Montserrat } from 'next/font/google'
import { TaskType } from '@/types/types';
import { AiOutlineComment } from 'react-icons/ai';
import { useState } from 'react';
import CommentModal from './tasks/CommentModal';
import useSocket from '@/context/useSocket';

const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })

const TaskCard = ({ description, deadline, points, status, pickedBy, createdAt, role, taskId, user, creator }: TaskType) => {
    const [openModal, setOpenModal] = useState(false)
    const socket = useSocket("http://localhost:8080")

    const handleModal = () => {
        setOpenModal((prev) => !prev)
        // joinRoom()
    }

    return (
        <div className="prompt_card">
            <div className="">
                <div
                    className=""
                >
                    <div className="flex flex-col p-3">
                        <p className="text-[0.8rem] text-gray-500 ml-4 ">
                            {status}
                        </p>
                        <h3 className={`${fredoka.className} text-gray-700 ml-4 font-medium text-lg capitalize `}>
                            {description}
                        </h3>
                        <div className='flex mt-2 font-medium text-gray-600'>
                            <p className={`${montserrat.className} text-base   font-medium `}>
                                ⏳ {deadline}
                            </p>

                            <p className="text-base ml-4 ">
                                ⭐️ {points} points
                            </p>
                        </div>

                        {/* <p className="text-sm text-gray-800 ml-4 ">
                            Picked By: {pickedBy}
                        </p> */}
                        <span className='p-2 text-gray-500 text-[0.7rem]'> {FormatTimeDifference(createdAt)}</span>
                    </div>
                </div>
                <div className="flex items-center justify-around p-2">
                    {
                        role && role === "child" ?
                            <button className="flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-2 px-5 rounded-lg " onClick={handleModal}>
                                <AiOutlineComment />
                                <span className="ml-2 text-sm">
                                    Comment
                                </span>
                            </button> :
                            <>
                                <button className="flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-2 px-5 rounded-lg " onClick={handleModal}>
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
                            </>

                    }

                    {
                        openModal &&
                        <CommentModal setOpenModal={setOpenModal} taskId={taskId} user={user} creator={creator} />
                    }

                </div>
            </div>
        </div>
    )
}

export default TaskCard