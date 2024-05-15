"use client"
import { Fredoka, Montserrat } from "next/font/google"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import { IoChevronBackSharp } from "react-icons/io5"
import Image from "next/image";
const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] });

// const fredoka = Fredoka{()}
const Header = ({ childId, data, role }) => {
    const router = useRouter()
    return (
        <div>
            <div className='flex items-center justify-between py-6 px-2'>
                <IoChevronBackSharp style={{ fontSize: "30px" }} onClick={() => router.back()} />
                <h2 className={`text-center text-xl  ${fredoka.className} font-medium text-gray-500`} >{`${data?.username}'s ${role === "parent" ? "Tasks" : "Profile"}`}</h2>
                <div className="">
                    <Image src={data?.image} alt={data?.username} width={50} height={50} />
                    <div className='flex space-x-1'>
                        <p className='text-[1.1rem]'>
                            {`${data?.points}`}
                        </p>
                        <span> ⭐️</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header