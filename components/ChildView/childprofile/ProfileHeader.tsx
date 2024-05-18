import { Fredoka, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })
const ProfileHeader = ({ username, taskCount, image, points }) => {
    return (
        <div>
            <section className="flex justify-between ">
                <div className="flex space-x-2 items-center">
                    <Image src={image} alt={username} width={50} height={50} />
                    <h2 className={`${fredoka.className} text-gray-700 font-medium text-lg capitalize `}>
                        Hi, {username}
                    </h2>
                </div>
                <p className={`${fredoka.className} bg-gray-900 rounded-3xl text-center flex items-center justify-center px-4 text-gray-100  `}>
                    Tasks done: {taskCount}
                </p>
            </section>
            <section>

                <div className={`flex flex-col items-center justify-center p-16 `}>
                    <span className={`${montserrat.className} text-slate-500`}>Total Earnings</span>
                    <h2 className={`flex ${fredoka.className} text-3xl`}>Earnings: {points} ⭐️</h2>
                </div>

                <div className="flex items-center justify-center space-x-10">

                    <div className=' flex flex-col justify-center items-center space-y-2'>
                        <Link href="/" className=" w-12 h-12 bg-gray-200 text-gray-900 text-xl  p-4 rounded-full flex items-center justify-center  shadow-lg">
                            <FaPlus />
                        </Link>
                        <span className={`${montserrat.className} text-slate-500 text-sm font-medium `}>More Tasks</span>

                    </div>
                    <div className=' flex flex-col justify-center items-center space-y-2'>
                        <Link href="/addgoal" className=" w-12 h-12 bg-gray-200 text-gray-900 text-xl  p-4 rounded-full flex items-center justify-center  shadow-lg">
                            <FaPlus />
                        </Link>
                        <span className={`${montserrat.className} text-slate-500 text-sm font-medium `}>Create Goal</span>

                    </div>

                </div>
            </section>
        </div>
    )
}

export default ProfileHeader