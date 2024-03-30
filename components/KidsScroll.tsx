"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

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
                console.log(data);
                setKids(data)
            }
            console.log(kids);

        }
        fetchKids()
    }, [userId, role])
    return (
        <div>
            <h2>Your Children</h2>
            <div></div>
        </div>
    )
}

export default KidsScroll