"use client"

import { useSession } from "next-auth/react"
import { Fredoka } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { GrLocation, GrSchedules } from "react-icons/gr"
import { LuMessageSquare } from "react-icons/lu"
import { RiHome2Line } from "react-icons/ri"
const fredoka = Fredoka({ subsets: ["latin"] })

const profileLinks = [

    {
        link: '/groupchat', icon: <LuMessageSquare style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "My Profile"
    },
    {
        link: '/map', icon: <GrLocation style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Privacy"
    },
    {
        link: '/calendar', icon: <GrSchedules
            style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Settings"
    },

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
        <div>
            <section className="flex items-center justify-center space-x-4">
                {
                    (kids as [])?.map((kid: any) => {
                        return (
                            <div key={kid?._id} className="flex space-x-3   bg-violet-300 rounded-lg  py-2">
                                <Link href={`/childprofile?id=${kid._id}`} className={`${kid._id === userId && "hidden "} flex flex-col items-center justify-center space-y-2 `} >
                                    < div className=" bg-[#dfd7fb] p-3 rounded-full h-12 w-12 flex items-center justify-center" >
                                        <Image src={kid.image} alt="girl child" width={100} height={100} />
                                    </div>

                                </Link>
                                <div>

                                    <h4 className={`${fredoka.className} font-normal capitalize text-[#444444d2] text-sm`}>{kid?.username}</h4>
                                    <h4 className={`${fredoka.className} font-normal capitalize text-[#444444d2] text-xl`}>{kid?.points}</h4>
                                </div>
                            </div >
                        )
                    })
                }
            </section>
        </div>
    )
}

export default ProfileBody