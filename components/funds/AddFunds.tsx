"use client"
import { useSession } from "next-auth/react"
import Input from "../Input"
import { useState } from "react"
import { SessionUser } from "@/types/types"


const AddFunds = () => {
    const { data: session } = useSession()
    const userId = (session?.user as SessionUser)?.id
    const [amount, setAmount] = useState<Number>()
    const [showErr, setShowErr] = useState(false)
    const [errMessage, setErrMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch("api/addfunds", {
                method: "POST",
                body: JSON.stringify({
                    userId: userId,
                    amount: amount
                })
            })
            if (!res.ok) {
                const response = await res.json()
                const errorMessage = response.message || 'An error occurred'

                setErrMessage(errorMessage)
                setShowErr(true)
            } else {
                console.log("successfully added");

                setAmount(0)
            }


        } catch (error) {
            console.log('Error parsing JSON response:', error)
            setErrMessage('An unexpected error occurred')
        }
    }

    return (
        <div className="w-[90%] flex m-auto">
            <form className="w-full flex m-auto flex-col">
                <div className="flex items-center justify-center border border-gray-300 w-full rounded-lg p-2">
                    <Input type="number" value={amount} placeholder="Add amount"
                        className=" outline-none border-none  p-2 w-[90%] "
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <p className="text-lg">⭐️</p>
                </div>
                <div className="flex items-center justify-center p-2 mt-8">
                    <button onClick={(e) => handleSubmit(e)} className="bg-black text-gray-100 p-4 rounded-lg w-4/6 ">
                        Buy Now
                    </button>
                </div>

            </form>



        </div>
    )
}

export default AddFunds