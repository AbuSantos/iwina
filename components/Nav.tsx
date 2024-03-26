'use client'
import Link from "next/link"
import UserForm from "./UserForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const Nav = ({ signOut }) => {
    const { data: session } = useSession()
    // const [kid, setKid] = useState()
    const userId = session?.user?.id;
    console.log(session?.user?.role);


    // useEffect(() => {
    //     const fetchKid = async () => {
    //         const res = await fetch(`api/users/kids/${userId}/kid`)
    //         if (!res.ok) {
    //             console.log("Failed to fetch kid data");
    //         }
    //         const data = await res.json()
    //         setKid(data)
    //     }

    //     fetchKid()
    // }, [])
    // console.log(kid);


    return (
        <div className="text-gray-50">
            <button onClick={signOut}>
                Sign out
            </button>

            <Link href="/profile">My Profile</Link>
            <Link href="/addkid">Add a child</Link>
        </div>
    )
}

export default Nav