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
    const [archiveData, setArchiveData] = useState([])
    const handleTab = (tab: string) => {
        setActiveTab(tab)
    }
    useEffect(() => {
        const currentDate = new Date()
        if (dateData) {
            const futureEvents = []
            const archiveEvents = []

            dateData?.forEach((scheduleDate) => {
                const eventTime = new Date(scheduleDate.timeLine);
                if (eventTime > currentDate) {
                    futureEvents.push(scheduleDate);
                } else {
                    archiveEvents.push(scheduleDate);
                }
            })
            setArchiveData(archiveEvents);
            setIsUpcomingData(futureEvents);

        }
    }, [dateData])



    return (

        <div className=" w-full overflow-y-scroll mb-40 ">
            <nav className="flex w-full bg-white items-center fixed justify-center space-x-3  text-sm text-slate-500 ">
                <p
                    onClick={() => handleTab("upcoming")}
                    className={`cursor-pointer p-2 eventTab ${activeTab === "upcoming" && "text-slate-900  active"}`}
                >
                    upcoming
                </p>
                <p onClick={() => handleTab("archived")} className={`cursor-pointer p-2 eventTab ${activeTab === "archived" && "text-slate-900 active"}`} >archived</p>
            </nav>
            <div className="h-screen  overflow-y-scroll mt-20">

                {activeTab === "upcoming" && (
                    (upcomingData && upcomingData.length === 0) ? (
                        <div>
                            <p>You currently have no scheduled Event</p>
                        </div>
                    ) : (
                        upcomingData.map((data, index) => {
                            const { title, username, image, start, timeLine } = data;
                            const startDate = start.split('-').slice(1, 3).join('/');
                            return (
                                <section
                                    key={index}
                                    className={`flex mb-2 justify-between items-center h-14 ${selectedSchedule ? "bg-red-100" : " bg-green-100"} p-2 rounded-lg`}
                                >
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image src={image || parent} alt="User" width={50} height={50} />
                                        </div>
                                        <div className="flex flex-col text-green-900">
                                            <p className="text-sm">{title}</p>
                                            <span className="text-slate-500 text-[0.6rem]">{username}</span>
                                        </div>
                                    </div>
                                    <span className="text-slate-500 text-[0.6rem]">{startDate}</span>
                                </section>
                            );
                        })
                    )
                )}
            </div>


            {
                activeTab === "archived" && (
                    archiveData && archiveData.map((data) => {
                        const { title, username, image, start, timeLine } = data;
                        const startDate = start.split('-').slice(1, 3).join('/');
                        return (
                            <section className={`flex mb-2 justify-between items-center h-14 ${selectedSchedule ? "bg-red-100" : " bg-red-100"} p-2 rounded-lg`} >
                                <div className="flex space-x-4">
                                    <div className="">
                                        <Image src={image ? image : parent} alt={"User "} width={50} height={50} />
                                    </div>
                                    <div className="flex flex-col  text-green-900">
                                        <p className="text-sm" >{title}</p>
                                        <span className="text-slate-500 text-[0.6rem]" >{username}</span>
                                    </div>
                                </div>
                                <span className="text-slate-500 text-[0.6rem]" >{startDate}</span>
                            </section>
                        );
                    }))
            }
        </div >
    );

}

export default EventDetails 