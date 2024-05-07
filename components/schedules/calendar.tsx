"use client"
import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import { useState, useEffect } from 'react'

interface Event {
    title: string;
    start: Date | string;
    allDay: boolean;
    id: number;
}

const Calendar = () => {
    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ])
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        start: '',
        allDay: false,
        id: 0
    })

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="grid grid-cols-10">
                <div className="col-span-8">
                    <FullCalendar
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin
                        ]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'resourceTimelineWook, dayGridMonth,timeGridWeek'
                        }}
                        // events={allEvents as EventSourceInput}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
                    // dateClick={handleDateClick}
                    // drop={(data) => addEvent(data)}
                    // eventClick={(data) => handleDeleteModal(data)}
                    />
                </div>
                <div id="draggable-el" className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
                    <h1 className="font-bold text-lg text-center">Drag Event</h1>

                </div>
            </div>
        </main >
    );
}

export default Calendar;