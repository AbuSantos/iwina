'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
const UserForm = () => {
    const router = useRouter()
    const [userData, setUserData] = useState({
        email: ' ',
        password: '',
        username: '',
    })
    const [submit, setSubmit] = useState<boolean>(false)
    const [showErr, setShowErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("api/users", {
                method: 'POST',
                body: JSON.stringify({
                    email: userData.email,
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
                router.push('/')
                router.refresh()
            }

            setUserData({
                email: '',
                password: '',
                username: '',
            })
        } catch (error) {
            setErrMessage(error.message)
        }
    }


    return (
        <div>
            <form action="submit" onSubmit={handleSubmit} method="post">
                <h1>Create User</h1>
                <div className="flex flex-col w-6/12 p-2">
                    {showErr && <p>{errMessage}</p>}

                    <div className="p-2">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={userData.username}
                            required
                            className="w-full flex  mt-2 p-3 text-sm text-gray-500 outline-0"
                        />
                    </div>
                    <div className="p-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={handleChange}
                            value={userData.email}
                            className="w-full flex  mt-2 p-3 text-sm text-gray-500 outline-0"
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
                            className="w-full flex  mt-2 p-3 text-sm text-gray-500 outline-0"
                        />
                    </div>
                    <input type="submit" value="Create User" className="cursor-pointer" />
                </div>
            </form>
        </div>
    )
}

export default UserForm