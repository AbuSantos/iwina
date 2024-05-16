"use client"
import { useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
const fredoka = Fredoka({ subsets: ["latin"] })
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick


import "react-datepicker/dist/react-datepicker.css";
import { Fredoka } from "next/font/google";
import Footer from "./Footer";
const StepTwo = ({ setCurrentStep, setIsActive }) => {
    const [startDate, setStartDate] = useState(new Date());
    const handleDateClick = (data) => {
        console.log(data)
    }

    const handleSubmit = async () => {
        setCurrentStep("three")
    }

    return (
        <div className="bg-gray-50 p-4 w-[95%] flex flex-col m-auto rounded-2xl mt-10 shadow-2xl ">
            <div className="flex flex-col items-center p-4 py-8">
                <h4 className={`${fredoka.className} capitalize text-violet-600`} >step 2</h4>
                <p className={`${fredoka.className} text-xl w-11/12 text-center`}>When do you want to achieve this?</p>
            </div>

            <div className="w-11/12 flex m-auto flex-col p-4 ">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={(data) => handleDateClick(data)}
                />

            </div>
            <div>
                <Footer handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default StepTwo