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
import { KidData } from '@/types/types';
import ChildEvent from '@/components/Events/ChildEvent';
import AboutChild from '@/components/ChildView/AboutChild';

const ChildProfileView = () => {
    const params = useSearchParams()
    const childId = params.get("id")
    const { data: session } = useSession()
    const role = (session?.user as any)?.role
    const userId = (session?.user as any)?.id
    const [data, setData] = useState<KidData | null>(null);
    const [activeTab, setActiveTab] = useState<string>("home");

    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/kids/${childId}/kid`)
            if (res.ok) {
                const data = await res.json()
                setData(data)
            }
        }
        fetchKids()
    }, [childId])

    const handleTab = (tab: string) => {
        setActiveTab(tab)
    }
    console.log(userId)

    return (
        <div className='' >
            {
                role === "parent" || userId !== childId
                    ?
                    <div className=''>
                        <Header childId={childId} data={data} role={role} />
                    </div>
                    :
                    <header className="p-4">
                        <ProfileHeader
                            username={(data)?.username}
                            image={data?.image}
                            taskCount={(data?.
                                completedTasks)?.length}
                            points={data?.points}
                        />
                    </header>
            }
            <div>
                <Tab tab1={"Goals"} tab2={"Home"} tab3={"About"} tab4={"Events"} activeTab={activeTab} handleTab={handleTab} role={role} />
            </div>
            {
                activeTab === ("goals") && <Goals childId={childId} />
            }
            {
                activeTab === ("home") && <div>
                    <div className='flex items-center justify-center mb-3 mt-16'>
                        < ChildOngoingTask childId={childId} data={data} />
                    </div>
                    <div className='flex items-center justify-center'>
                        < ChildViewCompletedTask childId={childId} role={role} />
                    </div>
                </div>
            }

            {
                role === "parent" ? <>
                    {
                        activeTab === ("about") && <AboutChild childId={childId} data={data} />
                    }
                    {
                        activeTab === ("events") &&
                        <ChildEvent />

                    }
                </> : ""
            }


            {/* <BottomNav /> */}
        </div>
    )
}

export default ChildProfileView