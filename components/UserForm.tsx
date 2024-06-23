'use client'
import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import sGirlChild from "@/public/images/sGirlChild.png"
import boychild from "@/public/images/boychild.png"
import aGirlChild from "@/public/images/aGirlChild.png"
import aBoyChild from "@/public/images/aBoyChild.png"
import { FaCamera } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Input from './Input'
import Prompts from './results/Prompts'
// import Notification from './Notification'
// import Notification, { showNotification } from "@/context/NotificationContext";



const UserForm = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        favTeachersName: '',
        favFood: '',
        allergies: '',
        doctorsName: '',
        birthday: '',
        favColor: '',
        bestFriendsName: '',
        favArtiste: '',
        favSong: '',
        favSubject: '',
    });
    const [selectAvatar, setSelectedAvatar] = useState(0)
    const [newTryAvatar, setNewTryAvatar] = useState("")
    const [selectImage, setSelectedImage] = useState("")
    const [newAvatar, setNewAvatar] = useState<string>("")
    const [submit, setSubmit] = useState<boolean>(false)
    const [showErr, setShowErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const { data: session } = useSession()
    const [succesful, setSuccessful] = useState(false)
    useEffect(() => {
        // Retrieve selectedAvatar and newAvatar values from local storage during component initialization
        const storedSelectedAvatar = window.localStorage.getItem('user_selected_avatar_index');
        const storedNewAvatar = window.localStorage.getItem('user_selected_avatar_url');
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
    const userId = (session?.user as any)?.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("api/users/kids", {
                method: 'POST',
                body: JSON.stringify({
                    userId,
                    password: userData.password,
                    username: userData.username.toLowerCase(),
                    favTeachersName: userData.favTeachersName,
                    favFood: userData.favFood,
                    allergies: userData.allergies,
                    doctorsName: userData.doctorsName,
                    birthday: userData.birthday,
                    favColor: userData.favColor,
                    bestFriendsName: userData.bestFriendsName,
                    favArtiste: userData.favArtiste,
                    favSong: userData.favSong,
                    favSubject: userData.favSubject,
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
                    // toast.error(<Notification msg={errorMessage} />)

                    setTimeout(() => {
                        setShowErr(false)
                    }, 2000)
                } catch (error) {
                    console.log('Error parsing JSON response:', error)
                    setErrMessage('An unexpected error occurred')
                }
            } else {
                console.log("successfully added");
                // router.push('/createTask')

                router.refresh()
                // displayMsg()
            }
            setUserData({
                username: '',
                password: '',
                favTeachersName: '',
                favFood: '',
                allergies: '',
                doctorsName: '',
                birthday: '',
                favColor: '',
                bestFriendsName: '',
                favArtiste: '',
                favSong: '',
                favSubject: '',
            });
        } catch (error) {
            console.log(error);

            setErrMessage(error)
        } finally {
            setSuccessful(true)
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
            {/* {showErr && <p>{errMessage}</p>} */}
            {/* <Notification /> */}
            {
                !succesful ? <>
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

                        {/* <button onClick={displayMsg}>Click me</button> */}


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
                            <div className="p-2 w-full">
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    value={userData.username}
                                    required
                                    className="w-full flex  mt-2 p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-500"
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
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"


                                />
                            </div>
                            <div className='flex gap-1 mt-2 p-2'>
                                <input
                                    type="text"
                                    name="birthday"
                                    placeholder="Birthday"
                                    onChange={handleChange}
                                    value={userData.birthday}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                                <input
                                    type="text"
                                    name="favSubject"
                                    placeholder="Fav Subject"
                                    onChange={handleChange}
                                    value={userData.favSubject}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                            </div>
                            <div className='flex gap-1 mt-2 p-2'>
                                <input
                                    type="text"
                                    name="favColor"
                                    placeholder="Fav Color"
                                    onChange={handleChange}
                                    value={userData.favColor}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                                <input
                                    type="text"
                                    name="favFood"
                                    placeholder="Fav Food"
                                    onChange={handleChange}
                                    value={userData.favFood}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                            </div>
                            <div className='flex gap-1 mt-2  p-2'>
                                <input
                                    type="text"
                                    name="doctorsName"
                                    placeholder="Doctors Name"
                                    onChange={handleChange}
                                    value={userData.doctorsName}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                                <input
                                    type="text"
                                    name="favTeachersName"
                                    placeholder="Fav Teacher"
                                    onChange={handleChange}
                                    value={userData.favTeachersName}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                            </div>
                            <div className='flex gap-1 mt-2 p-2'>
                                <input
                                    type="text"
                                    name="favSong"
                                    placeholder="Fav Song"
                                    onChange={handleChange}
                                    value={userData.favSong}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                                <input
                                    type="text"
                                    name="favArtiste"
                                    placeholder="Fav Artiste"
                                    onChange={handleChange}
                                    value={userData.favArtiste}
                                    required
                                    className="w-full flex p-4 text-sm text-gray-500 outline-0 shadow-sm border-b-2 border-b-gray-400"
                                />
                            </div>
                            <div className='absolute bottom-20 flex space-x-8 items-center '>
                                <button type="submit"
                                    className={`text-base px-16 py-2 text-[#4f2190] bg-[#fff]  border-2 border-[#4f2190] m-auto rounded-full`}
                                    onClick={() => router.back()}
                                >
                                    Back
                                </button>
                                <input type="submit" value="Add Child"
                                    className={`text-base px-7 py-2 g-[#4f2190] bg-[#4f2190]  m-auto  rounded-full  text-[#faf9fb]`}
                                />
                            </div>
                        </div>
                    </form>
                </> : <Prompts mode="success" actionName='added child' setSuccessful={setSuccessful} />


            }
        </div>
    )
}

export default UserForm
