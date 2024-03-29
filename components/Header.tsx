"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5";
import parent from "@/public/images/parent.png"
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"] })


const Header = () => {
    const { data: session } = useSession()
    const [searchTask, setSearchTask] = useState(" ")
    console.log(session);

    return (
        <div className={`bg-gradient-to-b from-[#4f2190] to-[#9e0fb1] text-lg ${fredoka.className}`}>
            <div className="flex flex-col items-center justify-center w-11/12 space-y-3 p-2">
                <div className="w-full">
                    <div className="flex items-center p-2 space-x-3">
                        <Image src={parent} width={80} height={50} className="rounded-full" alt="parent" />
                        <div className="text-gray-50">
                            <h4>Hi {session?.user?.name},👋🏾</h4>
                            <h3 >WELCOME</h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center bg-gray-50  w-full p-2 rounded-md space-x-2">
                    <IoSearchOutline />
                    <input type="text" placeholder="Search for task" className="outline-none p2" />
                </div>
            </div>
        </div>
    )
}

export default Header