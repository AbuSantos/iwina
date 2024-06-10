"use client"
import Header from "../ParentProfile/Header"
import AddFunds from '@/components/funds/AddFunds'
import Input from "./input/Input"
import { useEffect } from "react"

const Payment = () => {
    const handleRange = () => {
        console.log()
    }


    return (
        <div className="" >
            <Header />

            <div className="w-[98%] flex items-center justify-center m-auto mb-11">
                <Input />
            </div>

            <AddFunds />

        </div>
    )
}



export default Payment