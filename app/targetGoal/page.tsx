"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import withdraw from "@/public/images/withdraw.png"
import invest from "@/public/images/invest.png"
import investh from "@/public/images/investh.svg"
import piggy from "@/public/images/piggy.png"
import Image from 'next/image'

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
    console.log(data);

    return (
        <div>
            <header className='bg-violet-500 h-52'>
                <div className='w-full flex items-center justify-center'>
                    <Image src={piggy} alt="invest" width={300} />
                </div>

                <div>
                    <h1>Header</h1>
                    <span>10 Months left</span>
                </div>
                <div className='flex items-center justify-center space-x-8'>
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
        </div>
    )
}

export default page