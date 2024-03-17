'use client'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Task from "@/components/Task"
import TaskCard from '@/components/TaskCard'


const page = () => {
    const searchParams = useSearchParams()
    const taskId = searchParams.get("id")
    const session = useSession()
    const [task, setTask] = useState()
    const [picked, setPicked] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // console.log(session)
    useEffect(() => {
        const fetchTask = async () => {
            try {
                if (taskId) {
                    const res = await fetch(`api/task/${taskId}/etask`)
                    if (!res.ok) {
                        throw new Error('Failed to fetch task')
                    }
                    const data = await res.json()
                    setTask(data)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [taskId])
    // console.log(task[0]);


    const handleStatus = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: 'PATCH',
                body: JSON.stringify({
                    status: "In Progress",
                    userId: session?.data?.user?.id
                })
            })
            if (resp.ok) {
                setPicked(true)
                console.log("Status successfully changed");
            } else {
                throw new Error('Failed to update task status')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCompleted = async () => {
        try {
            const resp = await fetch(`api/task/${taskId}/etask`, {
                method: "PATCH",
                body: JSON.stringify({ status: "Completed", userId: session?.data })
            })
            if (resp.ok) {
                setPicked(true)
                console.log("Status successfully changed");
            } else {
                throw new Error('Failed to update task status')
            }
        } catch (error) {
            console.log(error)
        }
        if (loading) {
            return <div>Loading...</div>
        }

        if (error) {
            return <div>Error: {error}</div>
        }
        console.log(task)


        return (
            <div>
                <TaskCard
                    description={task?.[0].taskDesc}
                    status={task?.[0].status}
                    pickedBy={task?.[0].pickedBy}
                />

                <div>

                    <button
                        className='bg-red-500 p-4'
                        onClick={handleStatus}
                        disabled={picked}
                    >
                        {picked ? "Task Picked!" : "Pick Task"}
                    </button>


                    <button className='bg-green-500 p-4 '>
                        Completed
                    </button>
                </div>

            </div>
        )
    }

    export default page