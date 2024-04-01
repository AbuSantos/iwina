'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import sGirlChild from "@/public/images/sGirlChild.png"
import boychild from "@/public/images/boychild.png"
import aGirlChild from "@/public/images/aGirlChild.png"
import aBoyChild from "@/public/images/aBoyChild.png"
import { FaCamera } from "react-icons/fa";

const UserForm = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })
    const [selectAvatar, setSelectedAvatar] = useState(0)
    const [submit, setSubmit] = useState<boolean>(false)
    const [showErr, setShowErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const { data: session } = useSession()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) =>
        ({
            ...prevData,
            [name]: value
        }))
    }
    const userId = session?.user?.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("api/users/kids", {
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    password: userData.password,
                    username: userData.username,
                }),
            })

            if (!res.ok) {
                try {
                    const response = await res.json()
                    console.error('Error response:', response)

                    // Check if the response has a 'message' property
                    const errorMessage = response.message || 'An error occurred'

                    setErrMessage(errorMessage)
                    setShowErr(true)
                    setTimeout(() => {
                        setShowErr(false)
                    }, 2000)
                } catch (error) {
                    console.log('Error parsing JSON response:', error)
                    setErrMessage('An unexpected error occurred')
                }
            } else {
                router.push('/createTask')
                router.refresh()
            }

            setUserData({
                password: '',
                username: '',
            })
        } catch (error) {
            console.log(error);

            // setErrMessage(error)
        }
    }

    const avatars = [
        sGirlChild, boychild, aGirlChild, aBoyChild
    ]

    const avatarsBgColor = [
        "#a191fe", "#ffcc00", "#28cd41", "#9766db"
    ]

    console.log(avatarsBgColor[selectAvatar]);

    return (
        <div>
            <div className='space-y-4 py-4 w-full'>
                <div className='flex items-center justify-center'>
                    <div className={`flex items-center justify-around bg-[${avatarsBgColor[selectAvatar]}] w-24 h-24 rounded-full mb-5 `}>
                        < Image src={avatars[selectAvatar]} width={100} alt="A girl child" />
                    </div>
                </div>
                <div className='flex items-center justify-around mt-4'>
                    <div className='flex items-center justify-center bg-[#dfd7fb] w-14 h-14 rounded-full' >
                        <FaCamera style={{ fontSize: 25 }} />
                    </div>
                    {
                        avatars.map((avatar, index) =>
                            <div className={`flex items-center  bg-[${avatarsBgColor[index]}] w-16 h-16 rounded-full`} key={index} onClick={() => setSelectedAvatar(index)}>
                                < Image src={avatar} width={60} alt="A girl child" />
                            </div>
                        )
                    }
                </div>
            </div>


            <form action="submit" onSubmit={handleSubmit} method="post">
                <div className="flex flex-col  p-2">
                    {showErr && <p>{errMessage}</p>}

                    <div className="p-2 w-full">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={userData.username}
                            required
                            className="w-full flex  mt-2 p-4 text-sm text-gray-500 outline-0 shadow-sm border-2 border-gray-100 rounded-lg "
                        />
                    </div>
                    {/* <div className="p-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            value={userData.email}
                            className="w-full flex  mt-2 p-3 text-sm text-gray-500 outline-0"
                        />
                    </div> */}
                    <div className="p-2">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={handleChange}
                            value={userData.password}
                            className="w-full flex  mt-2 p-4 text-sm text-gray-500 outline-0 shadow-sm border-2 border-gray-100 rounded-lg "

                        />
                    </div>
                    <div className='absolute bottom-20 flex space-x-8 items-center '>
                        <button type="submit"
                            className={`text-base px-16 py-2 text-[#4f2190] bg-[#fff]  border-2 border-[#4f2190] m-auto rounded-full`}
                            onClick={() => router.back()}
                        >
                            Back
                        </button>
                        <input type="submit" value="Create User"
                            className={`text-base px-7 py-2 g-[#4f2190] bg-[#4f2190] m-auto  rounded-full  text-[#faf9fb]`}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserForm

//  text-[#faf9fb] text-[#4f2190]