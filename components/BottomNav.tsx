"use client"
import { useSession } from 'next-auth/react';
import { Fredoka } from 'next/font/google';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import { LuMessageSquare, LuUser2 } from "react-icons/lu";
import { RiHome2Line } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { GrSchedules } from "react-icons/gr";

const fredoka = Fredoka({ subsets: ["latin"] })

const BottomNav = () => {
    const { data: session } = useSession()
    const role = (session?.user as any)?.role

    const navLinks = [
        {
            link: '/', icon: <RiHome2Line style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Home"
        },
        {
            link: '/groupchat', icon: <LuMessageSquare style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Messages"
        },
        {
            link: '/map', icon: <GrLocation style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Location"
        },
        {
            link: '/profile', icon: <LuUser2 style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Profile"
        },
        {
            link: '/calendar', icon: <GrSchedules
                style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "schedules"
        },


    ]

    return (
        <div className='w-full  h-[130px]' style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999,
            cursor: 'pointer'
        }}>
            {

                role === 'parent' && (
                    <div className='add-task w-14 h-14 bg-[#6229b3] text-gray-100 text-xl p-4 rounded-full flex items-center justify-center ml-40 shadow-lg'>
                        <Link href="/createTask">
                            <FaPlus />
                        </Link>
                    </div>
                )
            }
            <div className='flex h-[80px]  items-center justify-around border-t-2 border-gray-200 bg-slate-50 rounded-r-xl rounded-l-xl shadow-xl'
            >
                {
                    navLinks.map((menu, index) => (
                        < Link href={menu.link} className={`text-[#6329b3d6] text-[0.8rem] ${fredoka.className}`}>
                            <div className="home flex flex-col items-center " key={index}>
                                {menu.icon}
                                {menu.title}
                            </div>
                        </Link>
                    ))
                }
            </div >
        </div >
    )
}

export default BottomNav