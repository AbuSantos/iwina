"use client"
import Header from '@/components/ChildView/Header';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation"
import ChildOngoingTask from '@/components/ChildView/ChildOngoingTask';

const ChildProfileView = () => {
    const params = useSearchParams()
    const childId = params.get("id")
    const [data, setData] = useState()

    console.log(childId);
    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/kids/${childId}/kid`)
            if (res.ok) {
                const data = await res.json()
                setData(data)
                console.log(data)
            }
        }
        fetchKids()
    }, [childId])
    return (
        <div>
            <div className=''>
                <Header childId={childId} data={data} />
            </div>
            <div className='flex items-center justify-center'>
                < ChildOngoingTask childId={childId} data={data} />
            </div>
        </div>
    )
}

export default ChildProfileView