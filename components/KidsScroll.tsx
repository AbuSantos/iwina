"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const KidsScroll = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id
    console.log(userId);

    const [kids, setKids] = useState()
    useEffect(() => {
        const fetchKids = async () => {
            const res = await fetch(`api/users/${userId}/user/kids`)
            if (res.ok) {
                const data = await res.json()
                setKids(data)
            }
            console.log(kids);

        }
        fetchKids()
    }, [])
    return (
        <div>
            <h2>Your Children</h2>
            <div></div>
        </div>
    )
}

export default KidsScroll