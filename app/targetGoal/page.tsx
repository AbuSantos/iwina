"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import withdraw from "@/public/images/withdraw.png"
import invest from "@/public/images/invest.png"
import piggy from "@/public/images/piggy.png"
import Image from 'next/image'
import { Fredoka } from "next/font/google"
import { monthsToDueDate } from '@/lib/FormatTime'
const fredoka = Fredoka({ subsets: ["latin"] })
import { FaPiggyBank } from "react-icons/fa6";

const page = () => {
    const [data, setData] = useState([])
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    console.log(id);

    useEffect(() => {
        const fetchGoals = async () => {
            const res = await fetch(`api/goal/${id}`)
            if (res.ok) {
                const data = await res.json()
                setData(data)
                // console.log(data)
            }
        }
        fetchGoals()
    }, [id])


    return (
        <div className='bg-violet-500'>
            <div>

                {
                    data.map((data) => {
                        return (
                            <header className='bg-violet-500 h-80'>
                                <div className='w-full flex items-center justify-center '>
                                    <Image src={piggy} alt="invest" width={200} />
                                </div>

                                <div className='flex flex-col justify-center items-center pb-3'>
                                    <h1 className={`${fredoka.className} text-4xl text-violet-200`}>{data.title}</h1>
                                    <span className="text-[0.75rem] text-gray-400">{`${monthsToDueDate(data.dueDate)} Months left`}</span>
                                </div>
                                <div className='flex items-center justify-center space-x-8 p-2'>
                                    <div className='flex flex-col items-center space-y-2 '>
                                        <Image src={invest} alt="invest" height={20} width={20} />
                                        <span className='text-[0.8rem] text-gray-100'>Investment</span>
                                    </div>
                                    <div className='flex flex-col items-center space-y-2 '>
                                        <Image src={withdraw} alt="withdraw" height={20} width={20} />
                                        <span className='text-[0.8rem] text-gray-100'>withdrawal</span>
                                    </div>
                                </div>

                            </header>
                        )

                    })
                }

            </div>

            <main className=' bg-white rounded-t-xl'>
                <div className='flex space-x-16 p-4' >
                    <div className='flex space-x-4 justify-center items-center'>
                        <FaPiggyBank className='text-lg' />
                        <div>
                            <span className='text-[0.75rem] text-gray-500'>Balance</span>
                            <h1 className={`${fredoka.className} text-2xl text-gray-800`}>2000</h1>
                        </div>
                    </div>
                    <div className='flex space-x-4 justify-center items-center'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 1 .75.75v.54l1.838-.46a9.75 9.75 0 0 1 6.725.738l.108.054A8.25 8.25 0 0 0 18 4.524l3.11-.732a.75.75 0 0 1 .917.81 47.784 47.784 0 0 0 .005 10.337.75.75 0 0 1-.574.812l-3.114.733a9.75 9.75 0 0 1-6.594-.77l-.108-.054a8.25 8.25 0 0 0-5.69-.625l-2.202.55V21a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 3 2.25Z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <span className='text-[0.75rem] text-gray-500'>Target</span>
                            <h1 className={`${fredoka.className} text-2xl text-gray-800`}>2000</h1>
                        </div>
                    </div>

                </div>
                <div>

                    <input
                        type="range"
                        // id={`goal-${gol.id}`}
                        className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-violet-500"
                        // max={gol.amount}
                        min={0}
                        // value={(gol.amountSaved)}
                        readOnly
                    />
                </div>

                <div className='flex space-x-3 p-4'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>

                    </div>
                    <p className='text-sm text-gray-700'>Based on your recent activity and frequent deposit, you will likely achieve this goal on time. Keep going.</p>
                </div>


                <section>
                    <div className="flex  items-center space-x-2 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                        </svg>
                        <h2 className={`${fredoka.className} text-xl text-gray-800`}>Progress towards your savings goal</h2>
                    </div>


                </section>
            </main>
        </div>
    )
}

export default page