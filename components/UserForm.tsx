'use client'
import { useState, useEffect } from 'react'
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
    const [newTryAvatar, setNewTryAvatar] = useState("")
    const [selectImage, setSelectedImage] = useState("")
    const [newAvatar, setNewAvatar] = useState<string>("")
    const [submit, setSubmit] = useState<boolean>(false)
    const [showErr, setShowErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const { data: session } = useSession()

    useEffect(() => {
        // Retrieve selectedAvatar and newAvatar values from local storage during component initialization
        const storedSelectedAvatar = window.localStorage.getItem('user_selected_avatar_index');
        const storedNewAvatar = window.localStorage.getItem('user_selected_avatar_url');
        console.log(storedSelectedAvatar);

        if (storedSelectedAvatar === null) {
            setSelectedImage(avatars[0]?.src);
        } else {
            setSelectedImage(avatars[storedSelectedAvatar]?.src);
        }

        // Set selectedAvatar state if it exists in local storage
        if (storedSelectedAvatar !== null && storedSelectedAvatar !== "") {
            setSelectedAvatar(Number(storedSelectedAvatar)); // Convert string to number
        }

        // Set newAvatar state if it exists in local storage
        if (storedNewAvatar !== null && storedNewAvatar !== "") {
            setNewAvatar(storedNewAvatar);
        }
    }, []);

    // Function to handle changes in selectedAvatar and store it in local storage
    const handleSelectedAvatarChange = (index: number) => {
        setSelectedAvatar(index);
        setSelectedImage(avatars[index].src)
        console.log(avatars[index]);

        window.localStorage.setItem('user_selected_avatar_index', String(index));
    };


    useEffect(() => {
        window.localStorage.setItem('user_selected_avatar_url', newAvatar)

    }, [newAvatar])


    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) =>
        ({
            ...prevData,
            [name]: value
        }))
    }
    const userId = session?.user?.id
    console.log(newAvatar);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newAvatar) {
            // setSelectedImage(newAvatar);
            console.log("yes");

        } else {
            setSelectedImage(avatars[selectAvatar].src);
        }
        console.log(selectImage);

        try {
            const res = await fetch("api/users/kids", {
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    password: userData.password,
                    username: userData.username,
                    image: newAvatar ? newAvatar : selectImage,
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



    const avatarsBgColor = [
        "#a191fe", "#ffcc00", "#28cd41", "#9766db"
    ]

    const handleCameraClick = () => {
        const inputElement = document.getElementById('cameraInput');
        inputElement?.click();

        // CLOUDINARY_URL=cloudinary://138785359917965:Yv3-4opisqaEgIqQWAX4JVoODqY@du5poiq3l
    }

    const handleCameraInputChange = async (event) => {
        // Handle camera input change here (e.g., upload image from camera)
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                await uploadFile(file)
                // console.log(selectAvatar)
            };
            if (reader.readyState === FileReader.EMPTY) {
                reader.readAsDataURL(file);
            } else {
                console.error('FileReader is busy reading another file.');
            }
        }
    }

    const uploadFile = async function (file: any) {
        try {
            const data = new FormData()
            data.append('file', file)
            // data.append("upload_preset", 'images')

            const res = await fetch(`api/upload`, {
                method: 'POST',
                body: data,
            })

            if (res.ok) {
                const data = await res.json()
                setNewAvatar(data.url)
                console.log(newAvatar);
            }
        }
        catch (error) {
            console.log(error);

        }
    }

    const avatars = [
        sGirlChild, boychild, aGirlChild, aBoyChild
    ]

    return (
        <div>
            <div className='space-y-4 py-4 w-full'>
                <div className='flex items-center justify-center'>
                    <div className={`flex items-center justify-around bg-[${avatarsBgColor[selectAvatar]}] w-24 h-24 rounded-full mb-5 `}>
                        {
                            newAvatar ?
                                <img src={newAvatar} width={100} alt="Selected avatar" height={120} />
                                :
                                < Image src={avatars[selectAvatar]} width={100} alt="avatar" />
                        }
                    </div>
                </div>




                <div className='flex items-center justify-around mt-4'>
                    <div className='flex items-center justify-center bg-[#dfd7fb] w-14 h-14 rounded-full' onClick={handleCameraClick}>
                        <input
                            id="cameraInput"
                            type="file"
                            accept="image/*"
                            capture="environment"
                            style={{ display: 'none' }}
                            onChange={handleCameraInputChange}
                        />
                        <FaCamera style={{ fontSize: 25 }} />
                    </div>
                    {
                        avatars.map((avatar, index) =>
                            <div className={`flex items-center  bg-[${avatarsBgColor[index] as string}] w-16 h-16 rounded-full`} key={index} onClick={() => handleSelectedAvatarChange(index)}>
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