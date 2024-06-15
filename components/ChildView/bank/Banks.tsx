"use client"
import Image from "next/image"
import eye from "@/public/images/eye.svg"
import eyeOff from "@/public/images/eye-off.svg"
import { useState } from "react"
const Banks = ({ bank }) => {
    const [showAccountNumber, setShowAccountNumber] = useState(false)
    const handleShowAccount = () => {
        setShowAccountNumber(!showAccountNumber)
    }

    return (
        <div>
            <section
                className="text-violet-800 bg-violet-200 font-medium rounded-lg text-sm px-5 py-4  inline-flex items-center justify-between outline-none w-full"
            >
                <div className="space-y-2">
                    <p className="capitalize">{bank.user_name}</p>
                    <h2>{bank.bank_name}</h2>
                </div>
                <div>
                    {
                        showAccountNumber ? <p className="text-sm">{bank.account_number}</p> : ""
                    }
                </div>
                <div>
                    {
                        showAccountNumber ? <Image src={eye} alt="eyes" onClick={handleShowAccount} /> : <Image src={eyeOff} alt="eyes" onClick={handleShowAccount} />
                    }
                </div>
            </section>
        </div>
    )
}

export default Banks