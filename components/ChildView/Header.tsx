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
            <div className='flex items-center justify-between py-2 px-2'>
                <IoChevronBackSharp style={{ fontSize: "30px" }} onClick={() => router.back()} />

                <div className={` bg-gray-900 rounded-3xl text-center flex items-center justify-between space-x-2 text-gray-100 text-sm p-2`}>
                    <div className="w-8 h-8">
                        <Image src={data?.image} alt={data?.username} width={50} height={50} />
                    </div>
                    <div className=''>
                        <p className='flex items-center justify-center text-[1rem]'>
                            <span className="text-[1rem] mr-1"> ⭐️ </span>
                            {`${data?.points}`}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header