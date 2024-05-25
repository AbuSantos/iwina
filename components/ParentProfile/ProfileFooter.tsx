import Image from "next/image"
import arrow from "@/public/images/arrow.svg"

const ProfileFooter = () => {
    return (
        <section className="text-gray-600 text-sm absolute bottom-0 w-full right-0 left-0 p-2">

            <div className="flex justify-between items-center p-2">
                <div className="flex justify-center items-center">
                    <span>Privacy Policy</span>
                    <Image src={arrow} alt="arrow" width={20} />
                </div>
                <div className="flex justify-center items-center">
                    <span>
                        English
                    </span>
                    <Image src={arrow} alt="arrow" width={20} />

                </div>
            </div >
            <hr />
            <div className="flex items-center justify-center">

                <span>
                    &copy; iwina 2024
                </span>
            </div>
        </section>
    )
}

export default ProfileFooter