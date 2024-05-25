"use client"

import { useSession } from "next-auth/react"
import { Fredoka } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GrLocation, GrSchedules } from "react-icons/gr"
import { LuMessageSquare } from "react-icons/lu"
import profile from "@/public/images/profile.svg"
import privacy from "@/public/images/shield.svg"
import settings from "@/public/images/setting.svg"
import help from "@/public/images/help.svg"
import location from "@/public/images/location.svg"
import arrow from "@/public/images/arrow.svg"
import chevron from "@/public/images/chevron.svg"
import { RiHome2Line } from "react-icons/ri"
import ProfileNav from "./ProfileNav"
const fredoka = Fredoka({ subsets: ["latin"] })

const profileLinks = [

    {
        link: '/details', icon: profile, title: "My Profile"
    },
    {
        link: '/map', icon: privacy, title: "Privacy & Settings"
    },
    {
        link: '/calendar', icon: location, title: "Geofencing"
    },
    {
        link: '/calendar', icon: settings, title: "Point Settings"
    },
    {
        link: '/calendar', icon: help, title: "About Iwina"
    },
]
const colors = [
    '#D9DAA5', '#94D9E0', '#5B7D6C', '#6E9155', '#788770', '#D9DAA5'
]

const ProfileBody = () => {
    const { data: session } = useSession()
    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role
    const [kids, setKids] = useState()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKids = async () => {
            try {
                const res = await fetch(`api/users/${userId}/user/kids?role=${role}`);

                if (!res.ok) {
                    throw new Error('Failed to fetch tasks');
                }
                const data = await res.json()
                setKids(data)
            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);

            }

        }
        fetchKids()
    }, [userId, role])

    if (loading) {
        return <div className="flex justify-center items-center p-2 ">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center p-2 ">Error: {error}</div>;
    }

    return (
        <div className=" p-2">
            <section className="grid grid-cols-2 items-center justify-center space-x-4 w-full">
                {
                    (kids as [])?.map((kid: any, index) => {
                        const color = colors[index]

                        return (
                            <div key={kid?._id} className={`flex space-x-8 rounded-lg px-2  py-2`}
                                style={{ backgroundColor: color }}

                            >
                                <Link href={`/childprofile?id=${kid._id}`} className={`${kid._id === userId && "hidden "} flex flex-col items-center justify-center space-y-2 `} >
                                    < div className=" bg-[#dfd7fb] p-3 rounded-full h-12 w-12 flex items-center justify-center" >
                                        <Image src={kid.image} alt="girl child" width={100} height={100} />
                                    </div>

                                </Link>
                                <div>
                                    <h4 className={`${fredoka.className} font-normal capitalize text-[#444444d2] text-lg`}>{kid?.username}</h4>
                                    <h4 className={`${fredoka.className} font-normal capitalize text-gray-800 text-2xl`}>{kid?.points}</h4>
                                </div>
                            </div >
                        )
                    })
                }
            </section>

            <section className="w-full">
                <ProfileNav profileLinks={profileLinks} />
            </section>
        </div>
    )
}

export default ProfileBody