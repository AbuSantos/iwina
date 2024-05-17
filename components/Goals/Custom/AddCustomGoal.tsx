"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import bggoal from "@/public/images/bggoal.png"
import Footer from './Footer'


const AddCustomGoal = ({ setCurrentStep, handleChange, goals }) => {


    const handleGoalSubmit = (e) => {
        e.preventDefault()
        setCurrentStep("two")
    }
    return (
        <div>
            <section>
                <figure className='flex items-center justify-center p-4'>
                    <Image src={bggoal} width={100} height={100} alt="bggoal" />
                </figure>
                <div className='flex flex-col gap-2 justify-center items-center  p-3 mt-12 bg-violet-400 h-96 w-[95%] m-auto rounded-b-2xl'>
                    <form action="" className='w-full' onSubmit={handleGoalSubmit}>
                        <div className='w-full p-2' >
                            <label htmlFor="title" className='block text-center text-slate-700 text-lg'>Goal title</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={goals.title}
                                onChange={handleChange}
                                className="rounded-none border-0 border-b-[0.5px] border-violet-300 w-full outline-none p-2 text-center bg-transparent text-violet-100 text-2xl font-medium"
                                id="title"
                            />
                        </div>
                        <div className='w-full p-2 mt-5 ' >
                            <label htmlFor="amount" className='block text-center text-slate-700 w-full text-lg'>Goal Amount</label>
                            <input
                                type="number"
                                name="amount"
                                required
                                value={goals.amount}
                                onChange={handleChange}
                                placeholder=""
                                className="rounded-none border-0 border-b-[0.5px] border-violet-300 w-full outline-none p-2 text-center bg-transparent text-violet-100 text-2xl font-medium"
                                id="amount"
                            />
                        </div>
                        <div className='w-full p-2 mt-5 ' >
                            <label htmlFor="amount" className='block text-center text-slate-700 w-full text-sm'>% of points earned to be saved</label>
                            <input
                                type="number"
                                name="percent"
                                required
                                value={goals.percent}
                                onChange={handleChange}
                                placeholder=""
                                className="rounded-none border-0 border-b-[0.5px] border-violet-300 w-full outline-none p-2 text-center bg-transparent text-violet-100 text-2xl font-medium"
                                id="percent"
                            />
                        </div>
                    </form>
                </div>

            </section>
            <div>
                <Footer handleSubmit={handleGoalSubmit} />
            </div>

        </div >
    )
}

export default AddCustomGoal