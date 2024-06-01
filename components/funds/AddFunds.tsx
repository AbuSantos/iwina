"use client"
import { useSession } from "next-auth/react"
import Input from "../Input"
import { useState } from "react"


const AddFunds = () => {
    const { data: session } = useSession()
    const userId = session?.user?.id
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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex items-center justify-center border-b-2 border-b-gray-300 w-full ">
                    <Input type="number" value={amount} placeholder="Add amount"
                        className=" outline-none border-none  p-2"
                        onChange={(e) => setAmount(Number(e.target.value))}
                    />
                    <div>
                        <p>PNTS</p>
                    </div>
                </div>

            </form>



        </div>
    )
}

export default AddFunds