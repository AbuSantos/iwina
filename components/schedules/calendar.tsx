"use client"
import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import { useState , useEffect} from 'react'

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
        <FullCalendar
            plugins={[dayGridPlugin,
                interactionPlugin,
                timeGridPlugin]}
            // initialView=" timeGridWeek"
            headerToolbar={{
                left: "prev, next today",
                center: "title",
                right: "resourceTimeLineWook, dayGridMonth, timeGridWeek"
            }}
            events={{}}
            nowIndicator={true}
            editable={true}
            droppable={true}
            selectMirror={true}
            selectable={true}
        />
    );
}

export default Calendar;