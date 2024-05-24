"use client"

import { GrLocation, GrSchedules } from "react-icons/gr"
import { LuMessageSquare } from "react-icons/lu"
import { RiHome2Line } from "react-icons/ri"

const profileLinks = [

    {
        link: '/groupchat', icon: <LuMessageSquare style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "My Profile"
    },
    {
        link: '/map', icon: <GrLocation style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Privacy"
    },
    {
        link: '/calendar', icon: <GrSchedules
            style={{ fontSize: 24, opacity: 0.7, color: "#000" }} />, title: "Settings"
    },

]

const ProfileBody = () => {
    return (
        <div>ProfileBody</div>
    )
}

export default ProfileBody