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

                </div>
                {
                    openBankModal &&
                    <  EditBankModal setOpenBankModal={setOpenBankModal} bankId={bank._id} />
                }
            </section>
        </div>
    )
}

export default Banks