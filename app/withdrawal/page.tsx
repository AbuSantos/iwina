"use client"
import { useFetch } from '@/hooks/useFetch'
import { SessionUser } from '@/types/types'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import spinner from "@/public/images/spinner.gif"
const page = () => {
    const { data: session } = useSession()
    const [openBankName, setOpenBankName] = useState(false)
    const [bankname, setBankName] = useState("")
    const [isSelectBank, setIsSelectBank] = useState(false)
    const [bankDetails, setBankDetails] = useState({
        account_number: "",
        user_name: "",
        bank_name: "",
        bank_code: null,
        email: ""

    })
    const [withdrawData, setWithdrawData] = useState({
        amount: null
    })
    const userId = (session?.user as SessionUser)?.id
    const { data, loading, errorMessage } = useFetch(`api/bank/${userId}/`)


    const openBankDropDown = () => {
        setOpenBankName(!openBankName)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setWithdrawData((prevData) => ({
            ...prevData, [name]: value
        })
        )
    }
    // opay: 999992
    // mtn: "120003"
    const handleNameChange = (bankId) => {
        data.map((bank) => (
            bank._id === bankId && setBankDetails({
                account_number: bank.account_number,
                user_name: bank.user_name,
                bank_name: bank.bank_name,
                email: bank.email,
                bank_code: bank.bank_name === "OPAY" ? 999992 : 120003
            })
        ))
        setIsSelectBank(true)
        setOpenBankName(false)
    }

    const handleWithdraw = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/paystack/withdrawal", {
            method: "POST",
            body: JSON.stringify({
                email: bankDetails.email,
                name: bankDetails.user_name,
                account_number: bankDetails.account_number,
                bank_code: bankDetails.bank_code,
                amount: withdrawData.amount,
                userId: userId
            })
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }


    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center ">
                <Image src={spinner} alt="spinner" width={100} />
            </div>
        )
    }
    return (
        <div className='p-3 w-4/6 flex flex-col m-auto'>
            <h2 className=' text-center p-3 capitalize font-semibold '>Withdraw your earned funds</h2>
            <section className='flex items-center justify-center'>
                <form action="form action" onSubmit={handleWithdraw} className='flex flex-col items-center justify-center w-full space-y-3'>

                    <div className='flex space-x-2 w-full border border-violet-500 border-opacity-15 p-2  rounded-md'>
                        <input placeholder='amount' type="number" name="amount" value={withdrawData.amount} onChange={handleChange} className='outline-none  w-full' />
                    </div>

                    {
                        data?.length === 0 ? <p className='text-center'> Please contact your parent to add your account</p> :
                            <div className='mt-2 w-full'>
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                    className="text-white bg-violet-700 font-medium rounded-t-md px-5 text-sm w-full py-2.5 text-center inline-flex items-center outline-none" type="button"
                                    onClick={openBankDropDown}
                                >
                                    {bankDetails.bank_name ? bankDetails.bank_name : "Select Bank"}
                                    <svg className="w-2.5 h-2.5 ms-24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                </button>
                                {openBankName && (
                                    <div id="dropdown" className="z-10 divide-y divide-gray-100 rounded-lg w-full">
                                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full" aria-labelledby="dropdownDefaultButton" >
                                            {
                                                data?.map((bank, index: any) => (
                                                    <li key={index} >
                                                        <a href="#" className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mb-2 dark:bg-gray-700" onClick={() => handleNameChange(bank._id)}>{bank.bank_name}</a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )}
                            </div>
                    }
                    <div>
                        {
                            isSelectBank && <div>
                                <div className='flex space-x-1  '>
                                    <span className='text-[0.6rem] text-gray-600'>Account Number:</span>
                                    <p className='text-gray-700 text-[1rem]'>{bankDetails.account_number}</p>
                                </div>
                                <div className='flex space-x-1 '>
                                    <span className='text-[0.6rem] text-gray-600'>Account Name:</span>
                                    <p className='text-gray-700 text-[1rem]'>{bankDetails.user_name}</p>
                                </div>

                                <div className='flex space-x-1 '>
                                    <span className='text-[0.6rem] text-gray-600'>Email:</span>
                                    <p className='text-gray-700 text-[1rem]'>{bankDetails.email}</p>
                                </div>
                            </div>
                        }
                    </div>

                    <button type='submit'>
                        withdraw
                    </button>
                </form>
            </section>
        </div >
    )
}

export default page