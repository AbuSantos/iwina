"use client"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"


const CompletedTask = () => {
    const { data: session } = useSession()
    useEffect(() => {
        const fetchTask = async () => {
            const res = await fetch("api/task")
            const data = await res.json()
            const filteredData = data.filter(task => task.status === "Completed")
            console.log(filteredData);
        }

        fetchTask()
    }, [])

    return (
        <div>CompletedTask</div>
    )
}

export default CompletedTask