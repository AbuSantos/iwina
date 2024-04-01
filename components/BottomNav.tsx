"use client"
import { Fredoka } from 'next/font/google';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { LuMessageSquare, LuUser2 } from "react-icons/lu";
import { RiHome2Line } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri";


const fredoka = Fredoka({ subsets: ["latin"] })

const BottomNav = () => {

    return (
        <div className='w-full  h-[130px]' style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
        }}>
            <div className='add-task w-14 h-14 bg-[#6229b3] text-gray-100 text-xl p-4 rounded-full flex items-center justify-center ml-40 shadow-lg'>
                <Link href="/createTask">
                    <FaPlus />
                </Link>
            </div>
            <div className='flex h-[80px]  items-center justify-around border-t-2 border-gray-200 bg-slate-50 rounded-r-xl rounded-l-xl shadow-xl'
            >
                <div className="home flex flex-col items-center ">
                    <RiHome2Line style={{ fontSize: 25, opacity: 0.7 }} />
                    <Link href="/" className={`text-[#6329b3d6] text-[0.9rem] ${fredoka.className}`}>
                        Home
                    </Link>
                </div>
                <div className="home flex flex-col items-center text-[0.8rem]">
                    <LuMessageSquare style={{ fontSize: 25, opacity: 0.7 }} />
                    <Link href="/" className={`text-[#6329b3d6] text-[0.9rem] ${fredoka.className}`}>
                        Messages
                    </Link>
                </div>
                <div className="home flex flex-col items-center text-[0.8rem]">
                    <RiNotification2Line style={{ fontSize: 25, opacity: 0.7 }} />
                    <Link href="/" className={`text-[#6329b3d6] text-[0.9rem] ${fredoka.className}`}>
                        Notification
                    </Link>
                </div>
                <div className="home flex flex-col items-center text-[0.8rem] ">
                    <LuUser2 style={{ fontSize: 25, opacity: 0.7 }} />
                    <Link href="/" className={`text-[#6329b3d6] text-[0.9rem] ${fredoka.className}`}>
                        Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BottomNav