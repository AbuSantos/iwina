"use client"
import { useSession } from "next-auth/react"
import { Fredoka } from "next/font/google"
import Image from "next/image"
import { useEffect, useState } from "react"
import girlchild from "@/public/images/girlchild.png"
import { FaPlus } from "react-icons/fa6";
import Link from "next/link"

const fredoka = Fredoka({ subsets: ["latin"] })

const KidsScroll = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id
    const role = session?.user?.role

    const [kids, setKids] = useState()

    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/${userId}/user/kids?role=${role}`);
            if (res.ok) {

                const data = await res.json()
                // console.log(data);
                setKids(data)
            }
            // console.log(kids);

        }
        fetchKids()
    }, [userId, role])
    return (
        <div className="w-full p-3">
            <h2 className={`${fredoka.className} text-lg font-medium`}>Your Children</h2>
            <div className="flex overflow-x-auto space-x-5 scrollbar-hide mt-3 items-center" >
                {
                    kids?.map((kid: any) => {
                        // console.log(kid);
                        return (
                            <div className="flex flex-col items-center" key={kid?._id}>
                                <Link href={`/childprofile?id=${kid._id}`}>
                                    <div className=" bg-[#dfd7fb] p-3 rounded-full h-14 w-14 flex items-center justify-center">
                                        <Image src={girlchild} alt="girl child" width={100} />
                                    </div>
                                    <h4 className={`${fredoka.className} font-normal capitalize text-[#444444d2]`}>{kid?.username}</h4>
                                </Link>
                            </div>
                        )
                    })
                }
                {
                    role === "parent" &&
                    <div className="flex flex-col items-center text-base">
                        <Link href="/createTask" className="h-14 w-14 flex items-center justify-center font-normal bg-[#4444444d] rounded-full text-gray-100">
                            <FaPlus />
                        </Link>
                        Add Child
                    </div>

                }

            </div>
        </div>
    )
}

export default KidsScroll