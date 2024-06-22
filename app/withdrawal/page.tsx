"use client"
import { useFetch } from '@/hooks/useFetch'
import { SessionUser } from '@/types/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const { data: session } = useSession()
    const [openBankName, setOpenBankName] = useState(false)
    const [bankname, setBankName] = useState("")
    const [withdrawData, setWithdrawData] = useState({
        email: null,
        name: null,
        account_number: null,
        bank_code: null,
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
    const handleNameChange = (name) => {
        setBankName(name)
        setOpenBankName(false)
    }
    const handleWithdraw = async (e) => {
        e.preventDefault()
        const res = await fetch("/api/paystack/withdrawal", {
            method: "POST",
            body: JSON.stringify({
                email: withdrawData.email,
                name: withdrawData.name,
                account_number: withdrawData.account_number,
                bank_code: withdrawData.bank_code,
                amount: withdrawData.amount
            })
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }
    useEffect(() => {
        const fetchBank = async () => {
            const res = await fetch("api/paystack/getbank")
            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }
        }
        fetchBank()
    }, [])
    return (
        <div className='p-3 w-4/6 flex flex-col m-auto'>
            <h2 className=' text-center p-3 capitalize font-semibold '>Withdraw your earned funds</h2>
            <section className='flex items-center justify-center'>
                <form action="form action" onSubmit={handleWithdraw} className='flex flex-col items-center justify-center w-full space-y-3'>
                    {/* <div className='w-full border border-violet-500 border-opacity-15 p-2 rounded-md'>
                        <input placeholder='Email' type="email" name="email" value={withdrawData.email} onChange={handleChange} className='outline-none' />
                    </div>

                    <div className='w-full border border-violet-500 border-opacity-15 p-2 rounded-md'>
                        <input placeholder='name' type="text" name="name" value={withdrawData.name} onChange={handleChange} />
                    </div>

                    <div className='w-full border border-violet-500 border-opacity-15 p-2 rounded-md'>
                        <input placeholder='account' type="number" name="account_number" value={withdrawData.account_number} onChange={handleChange} />
                    </div> */}
                    <div className='flex space-x-2 w-full border border-violet-500 border-opacity-15 p-2  rounded-md'>
                        <input placeholder='amount' type="number" name="amount" value={withdrawData.amount} onChange={handleChange} className='outline-none' />
                    </div>

                    <div className='mt-2 w-full'>
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                            className="text-white bg-violet-700 font-medium rounded-t-md px-5 text-sm w-full py-2.5 text-center inline-flex items-center outline-none" type="button"
                            onClick={openBankDropDown}
                        >
                            {bankname ? bankname : "Select Bank"}
                            <svg className="w-2.5 h-2.5 ms-24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {openBankName && (
                            <div id="dropdown" className="z-10 divide-y divide-gray-100 rounded-lg w-full">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 w-full" aria-labelledby="dropdownDefaultButton" >
                                    <li>
                                        <a href="#" className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mb-2 dark:bg-gray-700" onClick={() => handleNameChange("OPAY")}>Opay</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:bg-gray-700 rounded-b-md" onClick={() => handleNameChange("MTN MOMO")}>MTN MOMO</a>
                                    </li>
                                </ul>
                            </div>
                        )}
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