"use client"

import { Fredoka } from "next/font/google"
import Link from "next/link"
import { FaPlus } from "react-icons/fa";

const fredoka = Fredoka({ subsets: ["latin"] })
const Balance = () => {
    return (
        <div>
            <div className=" bal-image relative flex flex-col items-center justify-center">
                <h3 className={`${fredoka.className} text-gray-300 text-center text-sm`}> Balance</h3>
                <h1 className="text-3xl text-gray-100">⭐️ 30,000,000</h1>
                <Link href="/createTask" className="absolute -bottom-2 text-gray-100 text-xl ">
                    <FaPlus />
                </Link>
            </div>
        </div>
    )
}

export default Balance