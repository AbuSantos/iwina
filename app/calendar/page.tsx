"use client"
import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import { Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import NewModal from '@/components/ui/NewModal'

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
    const draggableContainer = useRef(null)
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

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el')
        // console.log(draggableContainer);
        // console.log(draggableEl);

        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",
                eventData: function (eventEl) {
                    console.log(eventEl);

                    let title = eventEl.getAttribute("title")
                    let id = eventEl.getAttribute("data")
                    let start = eventEl.getAttribute("start")
                    console.log(id);
                    return { title, id, start }
                }
            })
        }
    }, [])

    function handleDateClick(arg: { date: Date, allDay: boolean }) {
        setNewEvent({ ...newEvent, start: arg.date, allDay: arg.allDay, id: new Date().getTime() })
        setShowModal(true)
    }

    function addEvent(data: DropArg) {
        const event = {
            ...newEvent, start: data.date.toISOString(),
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime()
        }
        setAllEvents([...allEvents, event])
        // console.log("data", data)

    }

    function handleDeleteModal(data: { event: { id: string } }) {
        setShowDeleteModal(true)
        setIdToDelete(Number(data.event.id))

    }

    function handleDelete() {
        console.log(allEvents);

        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)


    }
    // console.log(allEvents);

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        })
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            allDay: false,
            id: 0
        })
    }

    const Create = {
        title: 'Create',
        icon: <CheckIcon />,
        buttonLabel: 'Create',


    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <div className=" ">
                <div className="w-full">
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
                        events={allEvents as EventSourceInput}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
                        dateClick={handleDateClick}
                        drop={(data) => addEvent(data)}
                        eventClick={(data) => handleDeleteModal(data)}
                    />
                </div>
                <div ref={draggableContainer} id="draggable-el" className=" w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50">
                    <h1 className="font-bold text-lg text-center">Drag Event</h1>
                    {events.map(event => (
                        <div
                            className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                            title={event.title}
                            key={event.id}
                        >
                            {event.title}
                        </div>
                    ))}
                </div>
            </div>

            <Transition show={showDeleteModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowDeleteModal}>
                    <TransitionChild
                        as={Fragment} enter="ease-out duration-300"
                        enterFrom='opacity-0' enterTo='opacity-100'
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg
                   bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                                >
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Delete Event
                                                </DialogTitle>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Are you sure you want to delete this event?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm 
                                         font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handleDelete}>
                                            Delete
                                        </button>
                                        <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 
                                           shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </DialogPanel>
                            </Transition>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <NewModal
                handleCloseModal={handleCloseModal}
                handleChange={handleChange} setShowModal={setShowModal}
                showModal={showModal} handleSubmit={handleSubmit}
                newEvent={newEvent} />
        </main >
    );
}

export default Calendar;