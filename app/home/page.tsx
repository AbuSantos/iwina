"use client"
import BottomNav from '@/components/BottomNav'
import KidsScroll from '@/components/KidsScroll'
import Nav from '@/components/Nav'
import Task from '@/components/Task'
import ParentEvent from '@/components/ui/ParentEvent'
import { useSession } from 'next-auth/react'
import React from 'react'

const HomePage = () => {
    const { data: session, status } = useSession()
    return (
        <div className="flex justify-center items-center flex-col w-full">
            <Nav />
            <KidsScroll />
            <Task />
            <ParentEvent mode={"parent"} />
            <BottomNav />
        </div>
    )
}

export default HomePage