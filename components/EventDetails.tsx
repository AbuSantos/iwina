import { useTaskContext } from "@/context/TaskContext"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import parent from "@/public/images/parent.png"
export const EventDetails = ({ dateData }) => {
    const { data: session } = useSession()
    // const [dateData, setDateData] = useState()
    const { fetchTasks, state } = useTaskContext()
    const [selectedSchedule, setSelectedSchedule] = useState(false)
    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role


    return (
        <div className="overflow-y-scroll w-full">

            <h1 className="font-bold text-lg text-center p-3">Scheduled Events</h1>
            {
                dateData && dateData.map((data) => {
                    const { title, username, image, start } = data
                    return (
                        <section className={`flex mb-2  space-x-5 items-center ${selectedSchedule ? "bg-red-100" : " bg-green-100"} p-2 rounded-lg`}>

                            <div className="h-12">
                                <Image src={image ? image : parent} alt={"User "} width={50} height={50} />
                            </div>
                            <div className="flex items-center space-x-2 text-green-900">
                                <span className="text-slate-600 text-sm">{start.split('-').slice(1, 3).join('/')}</span>
                                <h4 >{title}</h4>
                            </div>

                        </section >
                    )
                })
            }

        </div >
    )
}

export default EventDetails 