import { useTaskContext } from "@/context/TaskContext"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export const EventDetails = ({ dateData }) => {
    const { data: session } = useSession()
    // const [dateData, setDateData] = useState()
    const { fetchTasks, state } = useTaskContext()
    const [selectedSchedule, setSelectedSchedule] = useState(false)
    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: new Date(),
        end: new Date(),
        id: 0
    })
    const familyId = role === "parent" ? userId : state.data?.[0]?.creator
    // console.log(familyId, "role");



    // useEffect(() => {
    //     fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    // }, [userId, role])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await fetch(`api/schedule/${familyId}`)
    //             const data = await res.json()
    //             setDateData(data)
    //             console.log(data);

    //             data.map((date) => {
    //                 setNewEvent({
    //                     title: date.title,
    //                     start: date.date,
    //                     allDay: date.allDay,
    //                     id: date._id
    //                 })
    //             })
    //             console.log(dateData);

    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, [familyId]);
    return (
        <div className="overflow-y-scroll w-full">
            <h1 className="font-bold text-lg text-center p-3">Scheduled Events</h1>
            {
                dateData && dateData.map(() => {
                    return (
                        <section className={`flex mb-2 justify-between items-center ${selectedSchedule ? "bg-red-100" : " bg-green-100"} p-2 rounded-lg`}>
                            <div >
                            </div>
                            <div className="flex items-center space-x-2 text-slate-600">
                                <div className="justify-start">hello</div>
                                <h4 >Schedule Details</h4>
                            </div>
                            <span className="text-slate-600">timeline</span>

                        </section >
                    )
                })
            }

        </div >
    )
}

export default EventDetails 