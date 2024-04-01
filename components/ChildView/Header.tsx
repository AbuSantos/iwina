"use client"
import { Fredoka, Montserrat } from "next/font/google"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import { IoChevronBackSharp } from "react-icons/io5"
const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] });

// const fredoka = Fredoka{()}
const Header = ({ childId, data }) => {
    const router = useRouter()
    return (
        <div>
            <div className='flex items-center justify-between py-6 px-2'>
                <IoChevronBackSharp style={{ fontSize: "30px" }} onClick={() => router.back()} />
                <h2 className={`text-center text-xl  ${fredoka.className} font-medium text-gray-500`} >{data?.username}'s Tasks</h2>
                <p></p>
            </div>

        </div>
    )
}

export default Header