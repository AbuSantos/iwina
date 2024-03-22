"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import CompletedTask from "./CompletedTask"


const Profile = () => {
    const session = useSession()
    const userId = session?.data?.user?.id

    const [data, setData] = useState()
    useEffect(() => {
        const fetchUserTask = async () => {
            try {
                const res = await fetch(`api/users/${userId}/user`);
                const data = await res.json()
                setData(data)
                // console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchUserTask()
    }, [])
    // console.log(data, "Session")
    return (

        <div>
            {/* <img src={data?.image} alt="" /> */}
            <div className=''>
                <h2>Name: {data?.username}</h2>
                <h4>Total Points Earned : {data?.points}</h4>
                <CompletedTask userId={userId} />

            </div>
        </div>
    )
}

export default Profile