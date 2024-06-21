"use client"
import Image from "next/image"
import eye from "@/public/images/eye.svg"
import eyeOff from "@/public/images/eye-off.svg"
import edit from "@/public/images/edit.svg"
import { useState } from "react"
import EditBankModal from "./EditBank"
const Banks = ({ bank }) => {
    const [showAccountNumber, setShowAccountNumber] = useState(false)
    const handleShowAccount = () => {
        setShowAccountNumber(!showAccountNumber)
    }
    const [openBankModal, setOpenBankModal] = useState(false)
    const handleEdit = async (e) => {
        e.preventDefault()
        // setLoading(true)
        try {
            const res = await fetch(`api/bank/${bank._id}/edit`,
                {
                    method: "PATCH",
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
    // console.log(bank._id)
    const handleEditModal = () => {
        setOpenBankModal(!openBankModal)
    }
    return (
        <div>
            <section
                className="text-violet-800 bg-violet-200 font-medium rounded-lg text-sm px-5 py-4  inline-flex items-center justify-between outline-none w-full mt-2"
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
                <div className="flex space-x-4">
                    {
                        showAccountNumber ? <Image src={eye} alt="eyes" width={20} onClick={handleShowAccount} /> : <Image src={eyeOff} alt="eyes" width={20} onClick={handleShowAccount} />
                    }
                    <Image src={edit} alt="eyes" onClick={handleEditModal} width={20} className="cursor-pointer" />
                    {
                        openBankModal &&
                        <  EditBankModal setOpenBankModal={setOpenBankModal} bankId={bank._id} />
                    }
                </div>

            </section>
        </div>
    )
}

export default Banks