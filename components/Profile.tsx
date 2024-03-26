"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import CompletedTask from "./CompletedTask"
import OngoingTask from "./OngoingTask"


const Profile = () => {

    const { data: session } = useSession()
    const userId = session?.user?.id
    const userRole = session?.user?.role
    let api

    if (userRole === "child") {
        api = `api/users/kids/${userId}/kid`
    } else {
        api = `api/users/${userId}/user`

    }
    const [data, setData] = useState()
    useEffect(() => {
        const fetchUserTask = async () => {
            try {
                const res = await fetch(api);
                const data = await res.json()
                setData(data)
                // console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchUserTask()
    }, [api])
    console.log(session, "Session")
    return (

        <div>
            {/* <img src={data?.image} alt="" /> */}
            <div className=''>
                <h2>Name: {session?.user?.name}</h2>
                <h4>Total Points Earned : {data?.points}</h4>
                <div>
                    <div>
                        <h2>Completed Task</h2>
                        <CompletedTask />
                    </div>
                    <div>
                        <h2>Ongoing Task</h2>
                        <OngoingTask />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile