"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import close from "@/public/images/close.svg"
import success from "@/public/images/success.gif"
import loadingButton from "@/public/images/loadingbutton.gif"
import FullButton from '@/components/ui/Buttons'
import { useFetch } from '@/hooks/useFetch'
const EditBankModal = ({ bankId, successful, setOpenBankModal, bankname, setBankName, handleSubmit, setBankDetails, bankDetails }) => {
    const { data, loading, errorMessage } = useFetch(`api/bank/${bankId}/`)

    console.log(data)


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

    loading && <p>loading...</p>

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-gray-200  rounded-md w-5/6 ">
                {
                    successful ?
                        <div className='h-[70%]  md:h-[85%]'>

                            <div className="flex  justify-end">
                                <Image src={close} alt="close" onClick={() => setOpenBankModal(false)} className="cursor-pointer" width={30} />
                            </div>

                            <h2 className='text-lg text-center p-3'>Add a Bank</h2>
                            <section className=' w-full p-2'>
                                <form >
                                    <div className='w-full p-2 '>
                                        <input type="text" name="user_name" value={bankDetails.user_name} onChange={handleChange} placeholder='Bank Account Name' className='w-full p-3 outline-none rounded-md' />
                                    </div>
                                    <div className='w-full p-2'>
                                        <input type="email" name="email" value={bankDetails.email} onChange={handleChange} placeholder='Email' className='w-full p-3 outline-none rounded-md' />
                                    </div>
                                    <div className='w-full p-2'>
                                        <input type="number" name="account_number" value={bankDetails.account_number} onChange={handleChange} placeholder='Account Number' className='w-full p-3 outline-none rounded-md' />
                                    </div>
                                </form>

                                <div className='mt-2'>
                                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"
                                        className="text-white bg-violet-700 font-medium rounded-t-md px-5 text-sm w-[10rem] py-2.5 w text-center inline-flex items-center outline-none" type="button"
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
                                                    <a href="#" className="block px-4 py-2 w-[10rem] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white mb-2 dark:bg-gray-700 " onClick={() => handleNameChange("OPAY")}>Opay</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="block px-4 py-2 w-[10rem] hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:bg-gray-700 rounded-b-md" onClick={() => handleNameChange("MTN MOMO")}>MTN MOMO</a>
                                                </li>

                                            </ul>
                                        </div>
                                    }
                                </div>
                            </section>
                            <div className='flex mt-36 items-center justify-center p-3 '>
                                <button onClick={handleSubmit}
                                    className="text-white bg-violet-700 font-medium rounded-lg text-lg px-5 py-3.5 outline-none w-full" type="button"
                                >
                                    {loading ?
                                        <p className='flex items-center justify-center '>
                                            loading
                                            <Image alt="video" src={loadingButton} width={30} />
                                        </p>
                                        : "Submit"

                                    }
                                </button>
                            </div>
                        </div> :

                        <div className='flex flex-col  items-center justify-center p-4 h-44 space-y-4'>

                            <Image alt="video" src={success} width={50} />
                            <p className='text-xl'>
                                Bank Successfully Edited
                            </p>
                            < FullButton button_name="Back" onClick={() => setOpenBankModal(false)} />
                        </div>
                }

            </div>

        </div>
    )
}

export default EditBankModal