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
        <>
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

            <main>
                <div className='flex justify-center  items-center space-x-16 p-2' >
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
            </main>
        </>
    )
}

export default page