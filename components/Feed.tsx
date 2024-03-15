"use client"
import { useEffect, useState } from "react"

const Feed = () => {
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const fetchTasks = async () => {
            const res = await fetch('api/task')
            const data = await res.json()
            setTasks(data)
        }

        fetchTasks()
    }, [])

    console.log(tasks);

    //     return (
    //         <div>
    // console.log();

    //         </div>
    //     )
}

export default Feed
