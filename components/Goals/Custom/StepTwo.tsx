"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick
import "react-datepicker/dist/react-datepicker.css";
import { Fredoka } from "next/font/google";
import Footer from "./Footer";
import { useRef } from 'react';


const fredoka = Fredoka({ subsets: ["latin"] })
const StepTwo = ({ setCurrentStep, startDate, setStartDate }) => {
    const calendarApiRef = useRef(null);

    const handleDateClick = (data) => {
        // const calendarApi = calendarApiRef.current; // Access the API object

        // const clickedDate = data.date

        // const view = calendarApi.currentView
        // const startDate = view.visibleRange.start;
        // const endDate = clickedDate;


        // // Remove existing highlighting (optional)
        // calendarApi.getEvents().forEach(event => event.remove());

        // calendarApi.addEvent({ // Create a temporary highlighting event
        //     title: 'Highlight Range', // Optional title
        //     start: startDate,
        //     end: endDate,
        //     allDay: true,
        //     className: 'bg-violet-400'
        // });

        const clickedElement = data.dayEl;
        clickedElement.classList.toggle('bg-violet-400');
        setStartDate(data.date)
    }

    const handleSubmit = async () => {
        if (!startDate) {
            console.log("Please select a date");
        }
        else {
            setCurrentStep("three")
        }
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
                    ref={calendarApiRef}

                />

            </div>
            <div>
                <Footer handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default StepTwo