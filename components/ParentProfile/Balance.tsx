"use client"

import { useSession } from "next-auth/react";
import { Fredoka } from "next/font/google"
import Link from "next/link"
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";

const fredoka = Fredoka({ subsets: ["latin"] })
const Balance = () => {
    const [user, setUser] = useState([])
    const { data: session } = useSession()
    const userId = session?.user?.id
    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/${userId}/user`);
            if (res.ok) {
                const data = await res.json()
                setUser(data)
            }
        }
        fetchKids()
    }, [userId])

    return (
        <div>
            <div className=" bal-image relative flex flex-col items-center justify-center">
                <h3 className={`${fredoka.className} text-gray-300 text-center text-sm`}> Balance</h3>
                <h1 className="text-3xl text-gray-100">⭐️ {user?.points}</h1>
                <Link href="/point" className="absolute -bottom-2 text-gray-100 text-xl ">
                    <FaPlus />
                </Link>
            </div>
        </div>
    )
}

export default Balance