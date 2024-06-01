"use client"
import { useSession } from 'next-auth/react';
import { Fredoka } from 'next/font/google';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6';
import home from "@/public/images/home.svg"
import msg from "@/public/images/msg.svg"
import location from "@/public/images/location.svg"
import calendar from "@/public/images/calendar.svg"
import profile from "@/public/images/profile.svg"
import profull from "@/public/images/profilefull.svg"
import calfull from "@/public/images/calendarfull.svg"
import locfull from "@/public/images/locationfull.svg"
import msgfull from "@/public/images/messagesfull.svg"
import homefull from "@/public/images/homefull.svg"
import Image from 'next/image';


const fredoka = Fredoka({ subsets: ["latin"] })

const BottomNav = () => {
    const { data: session } = useSession()
    const role = (session?.user as any)?.role
    const userId = (session?.user as any)?.id
    const [activeTab, setActiveTab] = useState("Home")

    const navLinks = [
        {
            link: '/', icon: home, title: "Home", icon2: homefull
        },
        {
            link: '/groupchat', icon: msg, title: "Messages", icon2: msgfull
        },
        {
            link: '/map', icon: location, title: "Location", icon2: locfull
        },
        {
            link: '/calendar', icon: calendar, title: "schedules", icon2: calfull
        },
    ]
    const profileLink = role === "parent"
        ? { link: `/profile`, title: "My Profile" }
        : { link: `/childprofile?id=${userId}`, title: "Profile" };


    const handleTabChange = (tab: string) => {
        setActiveTab(tab)
    }
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
            <div className='flex h-[80px] items-center justify-around border-t-2 border-gray-200 bg-slate-50 rounded-r-xl rounded-l-xl shadow-xl'
            >
                {
                    navLinks.map((menu, index) => (
                        < Link href={menu.link}
                            className={`text-[#6329b3d6] text-[0.8rem] 
                        ${fredoka.className}`} onClick={() => handleTabChange(menu.title)}
                        >
                            <div className="home flex flex-col items-center " key={index}>
                                <Image
                                    src={activeTab === menu.title ? menu.icon2 : menu.icon}
                                    alt={menu.title}
                                />
                                {menu.title}
                            </div>
                        </Link>
                    ))
                }
                <Link href={profileLink.link} className={`text-[#6329b3d6] text-[0.8rem] ${fredoka.className}`}>
                    <div className="home flex flex-col items-center">
                        <Image src={profile} alt={profileLink.title} />
                        {profileLink.title}
                    </div>
                </Link>

            </div >
        </div >
    )
}

export default BottomNav