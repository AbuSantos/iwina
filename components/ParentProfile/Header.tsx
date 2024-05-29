"use client"
import { useSession } from "next-auth/react"
import parent from "@/public/images/parent.png"
import Image from "next/image"
import Back from "../ui/Back"
import Notification from "../Notification"
import { Fredoka } from "next/font/google"
const fredoka = Fredoka({ subsets: ["latin"] })
interface SessionUser {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}
const Header = () => {
    const { data: session } = useSession()
    const userId = (session.user as SessionUser).id

    return (
        <div className="  parent-header w-full">
            <div className="flex justify-between items-center p-2">
                <Back className="#000" />
                <p className={`${fredoka.className} text-lg font-medium`}>My Profile</p>
                <Notification />
            </div>
            <div className="flex items-center justify-center p-4">
                <Image src={parent} alt="parent" width={100} height={50} />
            </div>
        </div>
    )
}

export default Header