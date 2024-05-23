"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"

const ParentEvent = () => {
    const { data: session } = useSession()
    const userId = (session?.user as any)?.id
    const [dateData, setDateData] = useState([])
    const [isUpcomingData, setIsUpcomingData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`api/schedule/${userId}`)
                const data = await res.json()
                setDateData(data)
                data.map((date) => {
                    // console.log(date);
                })

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [userId]);
    // console.log(dateData);

    useEffect(() => {
        const currentDate = new Date();
        if (dateData) {
            const futureEvents = [];
            dateData.forEach((dates) => {
                const eventTime = new Date(dates.timeLine);

                if (currentDate > eventTime) {
                    futureEvents.push(dates)
                }
            })

            setIsUpcomingData(futureEvents);
        }
    }, [dateData]);

    return (
        <div className="">
            <div>
                <h3>Events</h3>
            </div>
            <section className="flex ">

                {
                    isUpcomingData.length === 0 ? (
                        <div>
                            <p>You currently have no scheduled events.</p>
                        </div>
                    ) : (
                        isUpcomingData.map((data, index) => {
                            const { title, username, image, start } = data;
                            const startDate = start.split('-').slice(1, 3).join('/');
                            return (
                                <section
                                    key={index}
                                    className={`flex mb-2 justify-between items-center h-14 `}
                                >
                                    <div className="flex space-x-4">
                                        <div>
                                            <Image src={image || parent} alt="parent" width={50} height={50} />
                                        </div>
                                        <div className="flex flex-col text-green-900 ">
                                            <p className="text-sm">{title}</p>
                                            <span className="text-slate-500 text-[0.6rem]">{username}</span>
                                        </div>
                                    </div>
                                    <span className="text-slate-500 text-[0.6rem]">{startDate}</span>
                                </section>
                            );
                        })
                    )
                }
            </section>

        </div>
    )
}

export default ParentEvent