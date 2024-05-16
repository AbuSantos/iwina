"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Input from '@/components/Input'
import AddCustomGoal from '@/components/Goals/Custom/AddCustomGoal'
import StepTwo from '@/components/Goals/Custom/StepTwo'
import Footer from '@/components/Goals/Custom/Footer'
import StepThree from '@/components/Goals/Custom/StepThree'

const page = () => {
    const [currentStep, setCurrentStep] = useState("one")
    const [goals, setGoals] = useState({ title: "", amount: "", percent: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setGoals((prevGoal) => ({
            ...prevGoal, [name]: value
        }))

    }

    const handleGoalSubmit = (e) => {
        e.preventDefault()
        console.log(goals);

    }

    return (
        <main>
            <section className="flex items-center justify-center m-auto space-x-5 w-10/12 p-4 ">
                <div className="flex items-center w-full">
                    <p className={`h-12 w-12 bg-violet-700 rounded-full flex justify-center items-center text-violet-100 mx-2`}>
                        1
                    </p>
                    <hr className="bg-slate-600  flex-1" />
                </div>
                <div className="flex items-center w-full">
                    <p className={`h-12 w-12 bg-violet-300 rounded-full flex justify-center items-center text-violet-100 mx-2`}>
                        2
                    </p>
                    <hr className="bg-slate-600  flex-grow " />
                </div>
                <div className="flex items-center ">
                    <p className={`h-12 w-12 bg-violet-300 rounded-full flex justify-center items-center text-violet-100`}>
                        3
                    </p>
                </div>
            </section>

            <section>
                {
                    currentStep === "one" &&
                    <AddCustomGoal handleChange={handleChange} goals={goals} handleSubmit={handleGoalSubmit} />
                }
            </section>
            <section>
                {
                    currentStep === "two" &&
                    <StepTwo />
                }
            </section>
            <section>
                {
                    currentStep === "three" &&
                    <StepThree />
                }
            </section>

        </main>
    )
}

export default page