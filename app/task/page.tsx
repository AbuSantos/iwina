'use client'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Task from "@/components/Task"
import TaskCard from '@/components/TaskCard'


const page = () => {
    const searchParams = useSearchParams()
    const taskId = searchParams.get("id")
    const [task, setTask] = useState()
    const [picked, setPicked] = useState(false)

    useEffect(() => {
        const fetchTask = async () => {
            if (taskId) {
                const res = await fetch(`api/task/${taskId}/etask`)
                const data = await res.json()
                setTask(data)
            }
        }
        fetchTask()
    }, [])

    const handleStatus = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: "In Progress"
                })
            })
            if (resp.ok) {
                setPicked(true)
                console.log("Status Succesfuly changed");
                // router.push('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const description = task?.[0].taskDesc
    const status = task?.[0].status

    return (
        <div>
            <TaskCard
                description={description}
                status={status}
            />

            <button
                className='bg-green-500 p-4'
                onClick={handleStatus}
                disabled={picked}
            >
                {picked ? "Task Picked!" : "Pick Task"}
            </button>
        </div>
    )
}

export default page