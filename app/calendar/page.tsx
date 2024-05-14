"use client"
import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { Draggable, DropArg } from "@fullcalendar/interaction" // needed for dayClick
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import { Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { BackspaceIcon, BackwardIcon, CheckIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { EventSourceInput } from '@fullcalendar/core/index.js'
import NewModal from '@/components/ui/EventModal'
import { useSession } from 'next-auth/react'
import { useTaskContext } from '@/context/TaskContext'
import EventDetails from '@/components/EventDetails'
import { useRouter } from 'next/navigation'
interface Event {
    title: string;
    end: Date | string;
    start?: Date | string;
    id: number;
    allDay: boolean;
    timeLine: Date

}

const Calendar = () => {
    const [events, setEvents] = useState([
        { title: 'event 1', id: '1' },
        { title: 'event 2', id: '2' },
        { title: 'event 3', id: '3' },
        { title: 'event 4', id: '4' },
        { title: 'event 5', id: '5' },
    ])
    const { data: session } = useSession()
    const draggableContainer = useRef(null)
    const [allEvents, setAllEvents] = useState<Event[]>([])
    const [showModal, setShowModal] = useState(false)
    const [isScheduleReply, setScheduleReply] = useState<boolean>(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [idToDelete, setIdToDelete] = useState<number | null>(null)
    const [dateData, setDateData] = useState()
    const { fetchTasks, state } = useTaskContext()
    const userId = (session?.user as any)?.id
    //@ts-ignore
    const usrname = (session?.user as string)?.name
    //@ts-ignore
    const image = (session?.user as string)?.image
    const role = (session?.user as any)?.role
    const [checkDate, setCheckedDate] = useState(new Date())
    const familyId = role === "parent" ? userId : state.data?.[0]?.creator
    // console.log(image, "role");
    const router = useRouter()

    const [newEvent, setNewEvent] = useState<Event>({
        title: '',
        end: new Date(),
        start: new Date(),
        allDay: false,
        id: 0,
        timeLine: new Date()
    })

    useEffect(() => {
        fetchTasks('GET', `api/users/${userId}/user/kids?role=${role}`)
    }, [userId, role])

    useEffect(() => {
        let draggableEl = document.getElementById('draggable-el')
        // console.log(draggableContainer);
        // console.log(draggableEl);

        if (draggableEl) {
            new Draggable(draggableEl, {
                itemSelector: ".fc-event",

                eventData: function (eventEl) {
                    console.log(".fc-event");
                    let title = eventEl.getAttribute("title")
                    let id = eventEl.getAttribute("data")
                    let start = eventEl.getAttribute("start")
                    console.log(id);
                    return { title, id, start }
                }
            })
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`api/schedule/${familyId}`)
                const data = await res.json()
                setDateData(data)
                data.map((date) => {
                    // console.log(date);

                    setNewEvent({
                        title: date.title,
                        start: date.date,
                        allDay: date.allDay,
                        end: date.start,
                        id: date._id,
                        timeLine: date.timeLine
                    })
                })

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [familyId]);
    // console.log(newEvent);


    function handleDateClick(arg: { date: Date, allDay: boolean }) {
        //@ts-ignore
        setNewEvent({ ...newEvent, start: arg.dateStr, allDay: arg.allDay, id: new Date().getTime(), timeLine: arg.date })
        setShowModal(true)
        // setScheduleReply(
        //     false
        // )
    }

    // console.log(checkDate);


    function addEvent(data: DropArg) {

        const event = {
            ...newEvent,
            start: data.date,
            title: data.draggedEl.innerText,
            allDay: data.allDay,
            id: new Date().getTime()
        }
        setAllEvents([...allEvents, event])
        // console.log("data", data)

    }

    function handleDeleteModal(data: { event: { id: string } }) {
        // setShowDeleteModal(true)
        // setIdToDelete(Number(data.event.id))
        console.log(data)

    }

    function handleDelete() {
        setAllEvents(allEvents.filter(event => Number(event.id) !== Number(idToDelete)))
        setShowDeleteModal(false)
        setIdToDelete(null)
    }

    function handleCloseModal() {
        setShowModal(false)
        setNewEvent({
            title: '',
            start: '',
            end: '',
            allDay: false,
            id: 0,
            timeLine: new Date()
        })
        setShowDeleteModal(false)
        setIdToDelete(null)
    }
    // console.log(checkDate.split('-').slice(1, 3));
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(newEvent.start);

        e.preventDefault()
        try {
            const res = await fetch(`api/schedule`, {
                method: "POST",
                body: JSON.stringify({
                    userId,
                    title: newEvent.title,
                    start: newEvent.start,
                    allDay: newEvent.allDay,
                    username: usrname,
                    image: image,
                    familyId: familyId,
                    timeLine: newEvent.timeLine
                }),
            })
            console.log(res);

            if (res.ok) {
                setShowModal(false)
                setNewEvent({
                    title: '',
                    allDay: false,
                    id: 0,
                    end: '',
                    timeLine: new Date()
                })
                setScheduleReply(
                    true
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewEvent({
            ...newEvent,
            title: e.target.value
        })
    }


    return (
        <main className="flex  flex-col items-center justify-between w-full">
            <div className=" w-full h-screen">

                <div className='flex items-center justify-between w-full p-2'>
                    <p onClick={() => router.back()} className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </p>
                    <h1 className="font-bold text-lg justify-center p-3">Scheduled Events</h1>
                    <p></p>
                </div>

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

                        events={dateData as [] as EventSourceInput}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
                        dateClick={handleDateClick}
                        // dateClick={handleDateClick}
                        drop={(data) => addEvent(data)}
                    // dateClick={(data) => handleDeleteModal(data)}
                    // eventClick={(data) => handleDeleteModal(data)}
                    />

                </div>
                <div className='w-11/12 flex  ml-5 fixed  h-screen'>
                    <EventDetails dateData={dateData} />
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
                showModal={showModal}
                handleSubmit={handleSubmit}
                newEvent={newEvent}
                isScheduleReply={isScheduleReply}
                setScheduleReply={setScheduleReply}
                setNewEvent={setNewEvent}
            // dateData={dateData}
            />
        </main >
    );
}

export default Calendar;