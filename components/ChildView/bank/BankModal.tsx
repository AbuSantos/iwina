"use client"
import FullButton from '@/components/ui/Buttons'
import React, { useState } from 'react'

const BankModal = ({ bankname, setBankName, handleSubmit, setBankDetails, bankDetails }) => {
    const [openDrop, setDrop] = useState(false)

    const openDropDown = () => {
        setDrop(!openDrop)
    }
    const handleNameChange = (name: string) => {
        setBankName(name)
        setDrop(false)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setBankDetails((prevData) => ({
            ...prevData, [name]: value
        }))
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-gray-200 p-4 rounded-md w-5/6 h-[60%]">

                {/* <div className='w'> */}


                <section className='p-4 '>
                    <form >
                        <div className='w-full p-2 '>
                            <input type="text" name="user_name" value={bankDetails.user_name} onChange={handleChange} placeholder='Bank Account Name' className='w-full p-2 outline-none rounded-md' />
                        </div>
                        <div className='w-full p-2'>
                            <input type="email" name="email" value={bankDetails.email} onChange={handleChange} placeholder='Email' className='w-full p-2 outline-none rounded-md' />

                        </div>
                        <div className='w-full p-2'>

                            <input type="number" name="account_number" value={bankDetails.account_number} onChange={handleChange} placeholder='Account Number' className='w-full p-2 outline-none rounded-md' />
                        </div>
                    </form>


                    <div className='mt-2'>
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
                            <div id="dropdown" className="z-10   divide-y divide-gray-100 rounded-lg  w-36 ">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mb-2 dark:bg-gray-700 rounded-t-md" onClick={() => handleNameChange("OPAY")}>Opay</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:bg-gray-700 rounded-b-md" onClick={() => handleNameChange("MTN MOMO")}>MTN MOMO</a>
                                    </li>

                                </ul>
                            </div>
                        }
                    </div>

                </section>
                <div className='flex mt-36 items-center justify-center  '>

                    <button onClick={handleSubmit}
                        className="text-white bg-violet-700 font-medium rounded-lg text-sm px-5 py-3.5 outline-none w-full" type="button"
                    >
                        Submit
                    </button>
                </div>

            </div>

            {/* </div> */}
        </div>
    )
}

export default BankModal