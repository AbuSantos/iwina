"use client"

import Header from "../ParentProfile/Header"
import AddFunds from '@/components/funds/AddFunds'
import Input from "./input/Input"
import { currentPointState } from "@/atoms/pointAtom"
import { useRecoilValue, useRecoilState } from 'recoil'

const Payment = () => {
    const rangeValue = useRecoilValue(currentPointState)
    const handleRange = () => {
        console.log(rangeValue)
    }


    return (
        <div className="" >
            <Header />
            <div className="flex items-center justify-center">
                <span className="p-2 text-sm text-gray-600 text-center">
                    For every point earned by a child, the value would be the corresponding amount in real world currency.
                </span>
            </div>

            <div className="w-[98%] flex items-center justify-center m-auto mb-11">
                <Input />
            </div>

            <AddFunds />
           

        </div>
    )
}



export default Payment