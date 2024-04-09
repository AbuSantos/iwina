"use client"

import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import { IoSearchOutline } from "react-icons/io5";
import parent from "@/public/images/parent.png"
import { Fredoka } from "next/font/google";
import Notification from "./Notification";
import { IoMdLogOut } from "react-icons/io";


const fredoka = Fredoka({ subsets: ["latin"] })


const Header = () => {
    const { data: session } = useSession()
    const [searchTask, setSearchTask] = useState(" ")
    // console.log(session);

    return (
        <div className={`bg-gradient-to-b from-[#4f2190] to-[#9e0fb1] text-lg ${fredoka.className} rounded-b-xl flex justify-center items-center`}>
            <div className="flex flex-col  w-full space-y-3 p-3">
                <div className="w-full">
                    <div className="flex  p-2 w-full justify-between">
                        <div className="flex items-center  space-x-2">
                            <Image src={parent} width={50} height={50} className="rounded-full" alt="parent avatar" />
                            <div className="text-gray-50 ">
                                <h4 className="text-sm">Hi {session?.user?.name},👋🏾</h4>
                                <h3>WELCOME</h3>
                            </div>
                        </div>
                        <div className="text-gray-50 flex judstify-center items-center space-x-2">
                            <Notification />
                            <span onClick={signOut} >
                                <IoMdLogOut style={{ fontSize: "20px", cursor: "pointer" }} />
                            </span>
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