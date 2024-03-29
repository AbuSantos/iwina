'use client'
import Link from "next/link"
import UserForm from "./UserForm"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Header from "./Header"

const Nav = () => {
    const { data: session } = useSession()
    const userRole = session?.user?.role

    return (
        <div className="text-gray-500 w-full">
            <Header />

            <Link href="/groupchat">Group chat</Link>
            {
                userRole === "child" && <Link href="/addgoal"> Add goal</Link>
            }
            <Link href="/profile">My Profile</Link>
            {
                userRole === "parent" &&
                <>
                    <Link href="/createTask"> Create Task</Link>
                    <Link href="/addkid">Add a child</Link>
                </>
            }
        </div>
    )
}

export default Nav