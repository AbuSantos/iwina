"use client"
import { useTaskContext } from '@/context/TaskContext'
import { useSession } from 'next-auth/react'
import { Fredoka } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'

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

    const golDueDate = (value) => {
        return new Date(value)
    }
    console.log(data)
    return (
        <main>
            <h2>Goals</h2>
            <div className="flex w-full overflow-x-auto">

                {
                    data?.map((gol) => (
                        <div key={gol.id} className="w-32  p-4 bg-violet-400 ml-2 rounded-lg ">
                            {/* <Image src={gol.image} alt={gol.goal} width={100} height={100} /> */}
                            <h4 className={`${fredoka.className} text-lg text-slate-100 capitalize`}>{gol.title}</h4>
                            <div>

                                <h2>{gol.amount}</h2>
                                <span>{golDueDate(gol.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div>

                                <input
                                    type="range"
                                    id={`goal-${gol.id}`}
                                    className="w-full"
                                    max={gol.amount}
                                    min={0}
                                    value={(gol.amountSaved / gol.amount) * 100}
                                    onChange={(e) => {
                                        const newAmountSaved = (e.target.value / 100) * gol.amount;
                                        // handle change, possibly update state or make an API call
                                    }}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default Goals