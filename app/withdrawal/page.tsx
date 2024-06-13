"use client"
import React, { useState } from 'react'

const page = () => {
    const [withdrawData, setWithdrawData]= useState({
        
    })
    const handleWithdraw = async () => { }
    return (
        <div>
            <h2>Withdraw Funds</h2>
            <section>
                <form >

                    <button onClick={handleWithdraw}>
                        withdraw
                    </button>
                </form>
            </section>
        </div>
    )
}

export default page