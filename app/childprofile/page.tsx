"use client"
import Header from '@/components/ChildView/Header';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import ChildOngoingTask from '@/components/ChildView/ChildOngoingTask';
import ChildViewCompletedTask from '@/components/ChildView/ChildViewCompleted';
import BottomNav from '@/components/BottomNav';
import ProfileHeader from '@/components/ChildView/childprofile/ProfileHeader';
import { useSession } from 'next-auth/react';

const ChildProfileView = () => {
    const params = useSearchParams()
    const childId = params.get("id")
    const [data, setData] = useState()
    const { data: session } = useSession()
    const role = (session?.user as any)?.role
    console.log(session);

    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/kids/${childId}/kid`)
            if (res.ok) {
                const data = await res.json()
                setData(data)
                // console.log(data)
            }
        }
        fetchKids()
    }, [childId])
    console.log(data);

    return (
        <div>
            <div className=''>
                <Header childId={childId} data={data} role={role} />
            </div>

            {role === "parent" && <header className="p-4">
                <ProfileHeader
                    username={(data)?.username}
                    image={data?.image}

                    taskCount={data?.
                        ongoingTasks?.length}
                />
            </header>}



            <div className='flex items-center justify-center mb-3'>
                < ChildOngoingTask childId={childId} data={data} />
            </div>
            <div className='flex items-center justify-center'>
                < ChildViewCompletedTask childId={childId} />
            </div>
            <BottomNav />
        </div>
    )
}

export default ChildProfileView