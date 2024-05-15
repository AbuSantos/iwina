"use client"
import { Fredoka, Montserrat } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoChevronBackSharp, IoSearchCircle, IoSearchCircleSharp } from "react-icons/io5"
import Input from "../Input"
const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })
const Header = () => {
    const router = useRouter()
    return (
        <div>
            <div className="flex justify-between p-2 items-center">
                <IoChevronBackSharp style={{ fontSize: "30px" }} onClick={() => router.back()} />
                <Link href={"/custom"} className={`${montserrat.className} text-lg font-medium`}>Custom</Link>
            </div>

            <div className="p-4">
                <p className={`${fredoka.className} text-lg text-center `}>Select the goal that you want to achieve</p>
            </div>

            <div className="flex m-auto bg-transparent rounded-lg w-10/12  border-2 border-slate-300 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <Input type="text" className="w-full border-none outline-none text-[0.9rem]" placeholder="search for goals..."
                />
            </div>
        </div>
    )
}

export default Header