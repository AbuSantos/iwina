import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import chevron from "@/public/images/chevron.svg"

type ProfileType = {
    link: string,
    icon: string,
    title: string,
}

const ProfileNav = ({ profileLinks }) => {
    return (
        <div>
            {
                (profileLinks)?.map((profile: ProfileType, index) => {
                    return (
                        <div key={index} className={`flex justify-between items-center px-4 cursor-pointer mt-3`}
                        >
                            <Link href={profile.link} className={` flex flex-col items-center justify-center space-y-2 `} >
                                < div className="p-3 flex items-center justify-center space-x-2" >
                                    <Image src={profile.icon} alt="girl child" width={20} height={20} />
                                    <p className="text-gray-700">{profile.title}</p>
                                </div>
                            </Link>
                            <Image src={chevron} alt="girl child" width={20} height={20} />
                        </div >
                    )
                })
            }
        </div>
    )
}

export default ProfileNav