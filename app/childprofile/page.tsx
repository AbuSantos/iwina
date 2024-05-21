"use client"
import Header from '@/components/ChildView/Header';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import ChildOngoingTask from '@/components/ChildView/ChildOngoingTask';
import ChildViewCompletedTask from '@/components/ChildView/ChildViewCompleted';
import BottomNav from '@/components/BottomNav';
import ProfileHeader from '@/components/ChildView/childprofile/ProfileHeader';
import { useSession } from 'next-auth/react';
import Goals from '@/components/Goals/Goaltab/Goals';
import Tab from '@/components/ui/Tab';

const ChildProfileView = () => {
    const params = useSearchParams()
    const childId = params.get("id")
    const [data, setData] = useState([])
    const { data: session } = useSession()
    const role = (session?.user as any)?.role
    const [activeTab, setActiveTab] = useState("goals")
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
    // console.log(data);

    const handleTab = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className='' >
            {role === "child" && <header className="p-4">
                {/* <div className=''>
                    <Header childId={childId} data={data} role={role} />
                </div> */}

                <ProfileHeader
                    username={(data)?.username}
                    image={data?.image}
                    taskCount={data?.
                        completedTasks?.length}
                    points={data?.points}
                />
            </header>}
            <div>
                <Tab tab1={"Goals"} tab2={"Home"} activeTab={activeTab} handleTab={handleTab} />
            </div>
            {
                activeTab === ("goals") && <Goals />
            }
            {
                activeTab === ("home") && <div>
                    <div className='flex items-center justify-center mb-3 mt-16'>
                        < ChildOngoingTask childId={childId} data={data} role={role} />
                    </div>
                    <div className='flex items-center justify-center'>
                        < ChildViewCompletedTask childId={childId} role={role} />
                    </div>
                </div>
            }



            <BottomNav />
        </div>
    )
}

export default ChildProfileView