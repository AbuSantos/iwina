import { FormatTimeDifference, formatTime } from '@/lib/FormatTime'
import { Fredoka, Montserrat } from 'next/font/google'
import { useRouter } from 'next/navigation'
import SingleCard from './ui/SingleCard';
import { TaskType } from '@/types/types';

const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })
const TaskCard = ({ description, deadline, points, status, pickedBy, createdAt }: TaskType) => {

    return (
        <div className="prompt_card">
            <div className="flex justify-between gap-5 items-center ">
                <div
                    className="flex "
                // onClick={() => router.push(`/user?id=${prompt.creator._id}`)}
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
            </div>
        </div>
    )
}

export default TaskCard