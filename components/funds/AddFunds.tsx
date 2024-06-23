"use client"
import { useSession } from "next-auth/react"
import Input from "../Input"
import { useEffect, useState } from "react"
import { SessionUser } from "@/types/types"
import mail from "@/public/images/mail.svg"
import naira from "@/public/images/naira.svg"
import Image from "next/image"

const AddFunds = () => {
    const { data: session } = useSession()
    const userId = (session?.user as SessionUser)?.id
    const [pointsData, setPointsData] = useState({
        amount: null,
        email: null,
        points: null
    })
    const [showErr, setShowErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const [pointBought, setPointBought] = useState(0)
    const [loading, setLoading] = useState(false);
    // const handleSubmit = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const res = await fetch("api/addfunds", {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 userId: userId,
    //                 amount: amount
    //             })
    //         })
    //         if (!res.ok) {
    //             const response = await res.json()
    //             const errorMessage = response.message || 'An error occurred'

    //             setErrMessage(errorMessage)
    //             setShowErr(true)
    //         } else {
    //             console.log("successfully added");

    //             setAmount(0)
    //         }


    //     } catch (error) {
    //         console.log('Error parsing JSON response:', error)
    //         setErrMessage('An unexpected error occurred')
    //     }
    // }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setPointsData((prevData) => ({
            ...prevData, [name]: value
        })
        )
    }

    const handleBalance = async () => {
        const response = await fetch(`api/paystack/balance`)

        if (response.ok) {
            const data = await response.json()
            console.log(data)
        }
    }

    useEffect(() => {
        setPointBought(pointsData.amount - ((pointsData.amount * 1) / 100))
    }, [pointsData.amount])

    const handlePaystackPayemnt = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const pointAmount = pointsData.amount;
            const email = pointsData.email
            const points = pointsData.amount - ((pointsData.amount * 1) / 100)


            console.log(points)
            // const response = await fetch(`api/paystack`, {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         pointAmount, email, points,
            //         emailredirect_url: "http://localhost:3000"
            //     })
            // })

            // if (response.ok) {
            //     const data = await response.json()

            //     if (data.status === 'success') {
            //         window.location.href = data.authorization_url;
            //     } else {
            //         console.error(data.error);
            //     }

            // } else {
            //     return Response.json({ status: 400, "Paystack API Error:": response.status });
            // }

        } catch (error) {
            console.log(error.message)

        } finally {
            setLoading(false);
            return Response.json({ status: 200, })
        }

    }

    return (
        <div className="w-[90%] flex m-auto">
            <form className="w-full flex m-auto flex-col space-y-2">
                <div className="flex items-center justify-center border border-gray-300 w-full rounded-lg p-2">
                    <Image src={naira} alt="email" width={25} className="p-0" />
                    <Input type="number" value={pointsData.amount} placeholder="Amount" name="amount"
                        className=" outline-none border-none  p-2 w-[90%] "
                        onChange={handleOnChange}
                    />
                </div>
                <div className="flex items-center justify-center border border-gray-300 w-full rounded-lg p-2">
                    <Image src={mail} alt="email" width={20} />
                    <Input type="email" value={pointsData.email} placeholder="Add your email" name="email"
                        className=" outline-none border-none  p-2 w-[90%] "
                        onChange={handleOnChange}
                    />
                </div>
                <div className="flex items-center justify-center  w-full rounded-lg p-2 space-x-2">
                    <p className="text-lg text-gray-600">Your receive </p>
                    <p className="text-2xl">⭐️ {pointBought}</p>
                </div>
                <div className="flex items-center justify-center p-2 mt-8">
                    <button onClick={(e) => handlePaystackPayemnt(e)} disabled={loading} className="bg-black text-gray-100 p-4 rounded-lg w-4/6 ">
                        {loading ? "Processing..." : "Buy Now"}
                    </button>
                </div>

            </form>

            {/* <button onClick={handleBalance}>
                handlebalance
            </button> */}

        </div>
    )
}

export default AddFunds