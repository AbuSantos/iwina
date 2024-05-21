"use client"
import { useTaskContext } from '@/context/TaskContext'
import { formatTime, formatDate } from '@/lib/FormatTime'
import { } from '@fullcalendar/core/index.js'
import { useSession } from 'next-auth/react'
import { Fredoka, Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
const montserrat = Montserrat({ subsets: ["latin"] });


const fredoka = Fredoka({ subsets: ["latin"] })


const Goals = () => {

    const { state, fetchTasks } = useTaskContext()
    const { data: session } = useSession()
    const userId = (session?.user as any)?.id
    const [data, setData] = useState([])

    useEffect(() => {

        const fetchKids = async () => {
            const res = await fetch(`api/goal/${userId}`)
            if (res.ok) {
                const data = await res.json()
                setData(data)
                // console.log(data)
            }
        }
        fetchKids()
    }, [userId])

    return (
        <main className=''>
            <div className='flex justify-between items-center p-3'>
                <h4 className={`${fredoka.className} text-2xl text-slate-700 capitalize p-2 `}>Goals</h4>
                <div className=''>
                    <Link href="/addgoal" className=" text-3xl">
                        <FaPlus />
                    </Link>
                    {/* <span className={`${montserrat.className} text-sm font-medium `}>Create Goal</span> */}

                </div>
            </div>
            <div className="flex w-full overflow-x-auto no-scrollbar">
                {
                    data?.map((gol) => (
                        <div key={gol.id} className="  p-4 bg-violet-400 ml-2 rounded-lg cursor-pointer  ">
                            <Link href={`/targetGoal?id=${gol._id}`}>
                                {/* <Image src={gol.image} alt={gol.goal} width={100} height={100} /> */}
                                <h4 className={`${fredoka.className} text-xl text-slate-100 capitalize p-2 `}>{gol.title}</h4>
                                <div className='flex space-x-3 items-center p-2  '>
                                    <h2 className='text-2xl font-medium text-gray-200'>
                                        <span className='text-[0.8rem]'>⭐️</span>

                                        {gol.amount}</h2>
                                    <span className='text-[0.7rem] text-slate-800'> {formatDate(gol.dueDate)}</span>
                                </div>
                                <div>

                                    <input
                                        type="range"
                                        id={`goal-${gol.id}`}
                                        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-violet-500"
                                        max={gol.amount}
                                        min={0}
                                        value={(gol.amountSaved)}
                                        readOnly
                                    />

                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Goals