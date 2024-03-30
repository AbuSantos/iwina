"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { LuMessageSquare, LuUser2 } from "react-icons/lu";
import { RiHome2Line } from "react-icons/ri";
import { RiNotification2Line } from "react-icons/ri";



const BottomNav = () => {

    return (
        <div className='w-full  h-[100px]' style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
        }}>
            <div className='add-task'>
                <FaPlus />
            </div>
            <div className='flex h-[80px]  items-center justify-around border-t-2 border-red-400 bg-slate-50 '
            >
                <div className="home flex flex-col items-center text-[0.8rem]">
                    <RiHome2Line style={{ fontSize: 27 }} />
                    <Link href="/" className='text-[#6229b3]'>
                        Home
                    </Link>
                </div>
                <div className="home flex flex-col items-center text-[0.8rem]">
                    <LuMessageSquare style={{ fontSize: 27 }} />
                    <Link href="/" className='text-[#6229b3]'>
                        Messages
                    </Link>
                </div>
                <div className="home flex flex-col items-center text-[0.8rem]">
                    <RiNotification2Line style={{ fontSize: 27 }} />
                    <Link href="/" className='text-[#6229b3]'>
                        Notification
                    </Link>
                </div>
                <div className="home flex flex-col items-center text-[0.8rem] ">
                    <LuUser2 style={{ fontSize: 27 }} />
                    <Link href="/" className='text-[#6229b3]'>
                        Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BottomNav