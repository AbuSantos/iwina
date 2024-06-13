"use client"
import React, { useState } from 'react'

const page = () => {
    const [withdrawData, setWithdrawData] = useState({
        email: null,
        name: null,
        account_number: null,
        bank_code: null,
        amount: 0
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setWithdrawData((prevData) => ({
            ...prevData, [name]: value
        })
        )
    }
    const handleWithdraw = async () => {
        const res = await fetch("api/paystack/withdrawal")
        if (res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }
    return (
        <div>
            <h2>Withdraw Funds</h2>
            <section>
                <form >
                    <input placeholder='email' type="email" name="email" value={withdrawData.email} onChange={handleChange} />
                    <input placeholder='name' type="text" name="name" value={withdrawData.name} onChange={handleChange} />
                    <input placeholder='account' type="number" name="account_number" value={withdrawData.account_number} onChange={handleChange} />
                    <input placeholder='bank' type="text" name="bank_code" value={withdrawData.bank_code} onChange={handleChange} />
                    <input placeholder='amount' type="number" name="amount" value={withdrawData.amount} onChange={handleChange} />
                    <button onClick={handleWithdraw}>
                        withdraw
                    </button>
                </form>
            </section>
        </div>
    )
}

export default page