import Image from "next/image"
import shieldtick from "@/public/images/shieldtick.svg"
import { Poppins } from "next/font/google"
import { MdDelete } from "react-icons/md";

const poppins = Poppins({ weight: "400", subsets: ["devanagari"] })

const Warning = () => {
    return (
        <div className="flex items-center justify-center flex-col space-y-3">

            <div className="flex space-x-1 p-3 m-auto items-center justify-center bg-violet-200 text-violet-800 w-[95%] rounded-lg">
                <Image src={shieldtick} alt="shield" width={20} />
                <p className={`text-[0.6rem] ${poppins.className}`}>We dont share your personal details with anyone, This is an information required solely for verification</p>
            </div>
            <div>
                <button className="flex items-center space-x-2 text-red-700 p-2 text-lg cursor-pointer">
                    <MdDelete />
                    <span>
                        close account
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Warning