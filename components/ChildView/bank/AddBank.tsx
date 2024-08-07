"use client"
import { SessionUser } from '@/types/types'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Banks from './Banks'
import FullButton from '@/components/ui/Buttons'
import BankModal from './BankModal'
import Image from 'next/image'
import spinner from "@/public/images/spinner.gif"

const AddBank = () => {
    const searchparams = useSearchParams()
    const userId = searchparams.get("id")
    const [banks, setBanks] = useState([])
    const [bankCode, setBankCode] = useState(null)
    const [bankname, setBankName] = useState(null)
    const [error, setError] = useState("")
    const [bankErrorMessage, setBankErrorMessage] = useState("")
    const [isBankError, setIsBankError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [bankNameLoading, setBankNameLoading] = useState(false)
    const [openBankModal, setOpenBankModal] = useState(false)
    const [successful, setSuccessful] = useState(true)


    const [bankDetails, setBankDetails] = useState({
        account_number: null,
        email: null,
        user_name: null,
        bank_code: null,

    })

    useEffect(() => {
        const fetchBank = async () => {
            setBankNameLoading(true);
            try {
                const res = await fetch(`api/bank/${userId}/`);
                if (res.ok) {
                    const data = await res.json();
                    setBanks(data);
                } else {
                    const errorData = await res.json();
                    setError(errorData.message || "Failed to fetch bank details");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setBankNameLoading(false);
            }
        };

        if (userId) {
            fetchBank();
        }
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await fetch("api/bank/",
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
                setSuccessful(false)
                console.log("success")
            } else {
                const errorData = await res.json();
                setBankErrorMessage(errorData.message || "Failed to add bank details");
                setIsBankError(true)
                // console.log(errorData.message)
            }
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
            setBankDetails({
                account_number: "",
                email: "",
                user_name: "",
                bank_code: "",
            })
        }
    }

    const addABank = () => {
        setOpenBankModal(!openBankModal)
        setSuccessful(true)
        setBankName(null)
        setIsBankError(false)
    }

    return (
        <div>
            <section>
                <div className='flex justify-between p-3 items-center'>
                    <h2 className='text-lg'>
                        Your Bank Details
                    </h2>
                    < FullButton button_name={"Add a Bank"} onClick={addABank} />
                </div>

                <div>
                    {bankNameLoading && <div className='flex items-center justify-center'>
                        <Image src={spinner} alt="loaiding state" width={100} />

                    </div>}
                    {error && <p>Error: {error}</p>}
                    {!bankNameLoading && !error && banks.length > 0 && (
                        <div className='mb-2'>
                            {banks.map((bank, index) => (
                                <Banks bank={bank} key={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <div>
                {
                    openBankModal &&
                    (
                        <BankModal
                            bankname={bankname}
                            setBankName={setBankName}
                            handleSubmit={handleSubmit}
                            bankDetails={bankDetails}
                            setBankDetails={setBankDetails}
                            setOpenBankModal={setOpenBankModal}
                            successful={successful}
                            loading={loading}
                            bankErrorMessage={bankErrorMessage}
                            isBankError={isBankError}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default AddBank