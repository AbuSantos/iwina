"use client"
import { SessionUser } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AddBank = () => {
    const searcharams = useSearchParams()
    const userId = searcharams.get("id")
    const [bank, setBanks] = useState([])
    const [bankCode, setBankCode] = useState(null)
    const [bankname, setBankName] = useState(null)
    const [openDrop, setDrop] = useState(false)
    const [loading, setLoading] = useState(false)

    // opay: 999992
    // mtn: "120003"
    const [bankDetails, setBankDetails] = useState({
        account_number: null,
        email: null,
        user_name: null,
        bank_code: null,

    })
    console.log(userId)
    useEffect(() => {
        const fetchBank = async () => {
            const res = await fetch(`api/bank/${userId}`)
            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }
        }
        fetchBank()
    }, [])

    const openDropDown = () => {
        setDrop(!openDrop)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setBankDetails((prevData) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // setLoading(true)
        try {
            const res = await fetch("api/bank",
                {
                    method: "POST",
                    body: JSON.stringify({
                        account_number: bankDetails.account_number,
                        email: bankDetails.email,
                        user_name: bankDetails.user_name,
                        creator: userId,
                        bank_name: bankname
                    })
                }
            )

            if (res.ok) {
                console.log("success")
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    const handleNameChange = (name: string) => {
        setBankName(name)
        setDrop(false)
    }
    return (
        <div>
            <h2>Add a Bank</h2>

            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                className="text-white bg-violet-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center outline-none" type="button"
                onClick={openDropDown}
            >
                {bankname ? bankname : "Select Bank"}
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            {
                openDrop &&
                <div id="dropdown" className="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleNameChange("OPAY")}>Opay</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleNameChange("MTN MOMO")}>MTN MOMO</a>
                        </li>

                    </ul>
                </div>
            }



            <section>
                <form >
                    <input type="text" name="user_name" value={bankDetails.user_name} onChange={handleChange} placeholder='Bank Account Name' />
                    <input type="email" name="email" value={bankDetails.email} onChange={handleChange} placeholder='Email' />
                    <input type="number" name="account_number" value={bankDetails.account_number} onChange={handleChange} placeholder='Account Number' />
                </form>

                <button onClick={handleSubmit}>submit</button>
            </section>



        </div>
    )
}

export default AddBank