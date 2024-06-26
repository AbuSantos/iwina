"use client"

import { useSession } from "next-auth/react"
import { Fredoka } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import line from "@/public/images/line.svg"
import spinner from "@/public/images/spinner.gif"
import lineB from "@/public/images/lineB.svg"
import { useSearchParams } from "next/navigation"
import { ParentEventType, SessionUser } from "@/types/types"
const fredoka = Fredoka({ subsets: ["latin"] })

const ParentEvent = ({ mode, childId }: ParentEventType) => {
    const { data: session } = useSession()
    const userId = (session?.user as SessionUser)?.id
    const role = (session?.user as SessionUser)?.role
    const [dateData, setDateData] = useState([])
    const [isUpcomingData, setIsUpcomingData] = useState([])
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [kids, setKids] = useState([])

    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/${userId}/user/kids?role=${role}`);
            if (res.ok) {
                const data = await res.json()
                setKids(data)
            }
        }
        fetchKids()
    }, [userId, role])

    const familyId = role === "parent" ? userId : kids?.[0]?.creator

    useEffect(() => {
        if (familyId) {
            const fetchData = async () => {
                try {
                    const res = await fetch(`api/schedule/${familyId}`);
                    if (!res.ok) throw new Error("Failed to fetch schedule");
                    const data = await res.json();
                    setDateData(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [userId, familyId]);

    useEffect(() => {
        if (dateData) {
            const currentDate = new Date();
            const futureEvents = [];
            const archiveEvents = [];
            const childEvents = []

            dateData.forEach((dates) => {
                const eventTime = new Date(dates.timeLine);
                if (eventTime > currentDate) {
                    futureEvents.push(dates);
                    if (dates.user === childId) {
                        childEvents.push(dates)
                    }
                } else {
                    archiveEvents.push(dates);
                }
            })

            if (mode === "child") {
                setIsUpcomingData(childEvents);
            } else {
                setIsUpcomingData(futureEvents);
            }
        }
    }, [dateData]);

    if (loading) {
        return <div className='flex items-center justify-center'>
            <Image src={spinner} alt="loaiding state" width={100} />
        </div>
    }

    if (error) {
        return <div className="flex justify-center items-center p-2 ">Error: {error}</div>;
    }


    return (
        <div className=" w-full mb-20">
            <header className="flex justify-between p-2">
                <h2 className={`${fredoka.className} text-lg text-gray-800`}>Events</h2>
                <Link href={"/calendar"} className={`${fredoka.className} text-lg text-violet-600`} >
                    See all
                </Link>
            </header>
            <section className={`${mode === "child" ? " flex flex-col items-center" : "flex"} p-2 overflow-y-auto no-scrollbar gap-2`}>
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
                                <div
                                    key={index}
                                    className={`flex bg-white border border-gray-200 rounded-lg shadow-lg ${mode === "child" ? "w-full" : "w-[15rem]"} h-28 p-2 space-x-1`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Image src={line} alt="line" width={mode === "child" ? 5 : 20} height={20} />
                                        <span className="text-slate-500 text-[0.8rem]">{startDate}</span>
                                    </div>

                                    <div className="flex w-80 bg-violet-100 rounded-lg p-2 space-x-2">
                                        <div className="flex flex-col ">
                                            <p className="text-sm font-semibold text-gray-900 capitalize ">{title}</p>
                                            <span className="text-slate-500 text-[0.6rem]">{username}</span>
                                        </div>
                                        {/* <Image src={image || parent} alt="parent" width={50} height={50} className="rounded-full" /> */}
                                    </div>
                                </div>
                            );
                        })
                    )
                }

            </section>

        </div>
    )
}

export default ParentEvent