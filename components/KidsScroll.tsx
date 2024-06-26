"use client"
import { useSession } from "next-auth/react"
import { Fredoka } from "next/font/google"
import Image from "next/image"
import { useEffect, useState } from "react"
import girlchild from "@/public/images/girlchild.png"
import { FaPlus } from "react-icons/fa6";
import Link from "next/link"
import { useTaskContext } from "@/context/TaskContext"
import { useRecoilState } from "recoil"
import { CurrentKidCount } from "@/atoms/kidsAtom"

const fredoka = Fredoka({ subsets: ["latin"] })

const KidsScroll = () => {
    const { data: session } = useSession()
    const { state, fetchTasks } = useTaskContext()
    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role
    const [kids, setKids] = useState()
    const [kidsData, setKidsData] = useRecoilState(CurrentKidCount)
    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/${userId}/user/kids?role=${role}`);
            if (res.ok) {
                const data = await res.json()
                setKids(data)
                setKidsData(data)
            }
        }
        fetchKids()
    }, [userId, role])

    return (
        <div className="w-full p-3">
            <div className="flex overflow-x-auto space-x-5 scrollbar-hide mt-3 items-center" >
                {
                    (kids as [])?.map((kid: any) => {
                        return (
                            <div key={kid?._id}>
                                <Link href={`/childprofile?id=${kid._id}`} className={`${kid._id === userId && "hidden "} flex flex-col items-center justify-center space-y-2 `} >
                                    < div className=" bg-[#dfd7fb] p-3 rounded-full h-14 w-14 flex items-center justify-center" >
                                        <Image src={kid.image} alt="girl child" width={100} height={100} />
                                    </div>

                                    <h4 className={`${fredoka.className} font-normal capitalize text-[#444444d2] text-sm`}>{kid?.username}</h4>
                                </Link>
                            </div >
                        )
                    })
                }
                {
                    role === "parent" &&
                    <div className="flex flex-col items-center justify-center text-sm space-y-2">
                        <Link href="/addkid" className="h-14 w-14 flex items-center justify-center font-normal bg-[#4444444d] rounded-full text-gray-100">
                            <FaPlus />
                        </Link>
                        <span className="text-[0.75rem]">
                            Add Child
                        </span>
                    </div>
                }

            </div >
        </div >
    )
}

export default KidsScroll