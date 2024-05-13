import { useTaskContext } from "@/context/TaskContext"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import parent from "@/public/images/parent.png"
import { BgEvent } from "@fullcalendar/core/internal"
export const EventDetails = ({ dateData }) => {
    const { data: session } = useSession()
    // const [dateData, setDateData] = useState()
    const { fetchTasks, state } = useTaskContext()
    const [selectedSchedule, setSelectedSchedule] = useState(false)
    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role
    const [activeTab, setActiveTab] = useState("upcoming");
    const [upcomingData, setIsUpcomingData] = useState([])
    const [archiveData, setarchiveData] = useState([])
    const handleTab = (tab: string) => {
        setActiveTab(tab)
    }
    useEffect(() => {
        const currentDate = new Date()
        dateData?.map((scheduleDate) => {
            if (scheduleDate) {
                const newData = scheduleDate.filter((date) => eventDate(date.timeLine) < currentDate)
                console.log(newData);

                setarchiveData(newData)
            }

        })
    }, [dateData])

    const eventDate = (arg: Date) => {
        const givenDate = new Date(arg);
        return givenDate
    }


    // // Compare the current date with the given date
    // if (currentDate > givenDate) {
    //     console.log('Today has passed the given date.');
    // } else {
    //     console.log('Today has not passed the given date.');
    // }


    return (
        <div className="overflow-y-scroll w-full">
            <h1 className="font-bold text-lg text-center p-3">Scheduled Events</h1>

            <nav className="flex items-center justify-center space-x-3 p-2 text-sm text-slate-500 ">
                <p
                    onClick={() => handleTab("upcoming")}
                    className={`cursor-pointer p-2 eventTab ${activeTab === "upcoming" && "text-slate-900  active"}`}
                >
                    upcoming
                </p>

                <p

                    onClick={() => handleTab("archived")} className={`cursor-pointer p-2 eventTab ${activeTab === "archived" && "text-slate-900 active"}`} >archived</p>
            </nav>
            {
                activeTab === "upcoming" && (
                    dateData && dateData.map((data) => {
                        const { title, username, image, start, timeLine } = data;
                        // console.log(timeLine, "timel");

                        const startDate = start.split('-').slice(1, 3).join('/');
                        return (
                            <section className={`flex mb-2  space-x-5 items-center h-14 ${selectedSchedule ? "bg-red-100" : " bg-green-100"} p-2 rounded-lg`} >
                                <div className="">
                                    <Image src={image ? image : parent} alt={"User "} width={50} height={50} />
                                </div>
                                <div className="flex flex-col  text-green-900">
                                    <p className="text-sm" >{title}</p>
                                    <span className="text-slate-500 text-[0.6rem]" >{startDate}</span>
                                </div>
                            </section>
                        );
                    }))
            }
        </div >
    );

}

export default EventDetails 