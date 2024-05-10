"use client"
import React, { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import TestModal from '@/components/ui/TestModal'

const page = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const calendaRef = useRef(null)
    function openModal() {
        setIsOpen(true);
    }
    const OnEventAdded = (e) => {
        if (calendaRef.current) {
            console.log(calendaRef.current.getApi());

            let calendaApi = calendaRef.current.getApi()
            calendaApi.addEvent(e)
        }
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className=' relative z-0'>
            <FullCalendar
                ref={calendaRef}
                plugins={[
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin
                ]}
                initialView="dayGridMonth"
                editable={true}
                // droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick={openModal}
            // drop={(data) => addEvent(data)}
            // eventClick={(data) => handleDeleteModal(data)}
            />
            <div className="relative z-10 bg-slate-50  inset-0 overflow-y-auto" >
                <TestModal setIsOpen={setIsOpen} closeModal={closeModal} openModal={openModal} modalIsOpen={modalIsOpen} OnEventAdded={(e) => OnEventAdded(e)}
                />
            </div>

        </div>
    )
}

export default page