"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Input from '@/components/Input'
import AddCustomGoal from '@/components/Goals/Custom/AddCustomGoal'
import StepTwo from '@/components/Goals/Custom/StepTwo'
import Footer from '@/components/Goals/Custom/Footer'
import StepThree from '@/components/Goals/Custom/StepThree'
import { useSession } from 'next-auth/react'
import { useTaskContext } from '@/context/TaskContext'

const page = () => {
    const [currentStep, setCurrentStep] = useState("one")
    const [isActive, setIsActive] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const { data: session } = useSession()
    const userId = (session?.user as any)?.id
    const role = (session?.user as any)?.role
    const { state, fetchTasks } = useTaskContext()

    const [goals, setGoals] = useState({ title: "", amount: "", percent: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setGoals((prevGoal) => ({
            ...prevGoal, [name]: value
        }))

    }
    useEffect(() => {
        // fetchTasks("GET", `api/users/${userId}/user/kids?role=${role}`)
        fetchTasks("GET", `api/users/kids${userId}/user/kid`)
    }, [userId]);


    const handleSubmit = async () => {
        const res = await fetch(`api/goal`, {
            method: "POST",
            body: JSON.stringify({
                creator: userId,
                title: goals.title,
                amount: goals.amount,
                rate: goals.percent,
                dueDate: startDate,
                amountSaved: 0

            })
        })
        if (res.ok) {
            console.log("Successfully created goal");
        }
    }

    return (
        <main>
            <section className="flex items-center justify-center m-auto space-x-5 w-10/12 p-4 ">
                <div className="flex items-center w-full">
                    <p className={`h-12 w-12 ${currentStep === "one" ? "bg-violet-700" : "bg-violet-300"}  rounded-full flex justify-center items-center text-violet-100 mx-2`}>
                        1
                    </p>
                    <hr className="bg-slate-600  flex-1" />
                </div>
                <div className="flex items-center w-full">
                    <p className={`h-12 w-12 ${currentStep === "two" ? "bg-violet-700" : "bg-violet-300"} rounded-full flex justify-center items-center text-violet-100 mx-2`}>
                        2
                    </p>
                    <hr className="bg-slate-600  flex-grow " />
                </div>
                <div className="flex items-center ">
                    <p className={`h-12 w-12 ${currentStep === "three" ? "bg-violet-700" : "bg-violet-300"} rounded-full flex justify-center items-center text-violet-100`}>
                        3
                    </p>
                </div>
            </section>

            <section>
                {
                    currentStep === "one" &&
                    <AddCustomGoal setCurrentStep={setCurrentStep} goals={goals} handleChange={handleChange} />
                }
            </section>
            <section>
                {
                    currentStep === "two" &&
                    <StepTwo setCurrentStep={setCurrentStep} setStartDate={setStartDate} startDate={startDate} />
                }
            </section>
            <section>
                {
                    currentStep === "three" &&
                    <StepThree handleSubmit={handleSubmit} />
                }
            </section>

        </main>
    )
}

export default page