import React, { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import "@/styles/styles.css"
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { CheckIcon } from '@heroicons/react/20/solid';
// Import the library
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

interface ModalProps {
    handleCloseModal: () => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setShowModal: Dispatch<SetStateAction<boolean>>
    showModal: boolean
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    newEvent: any
    setNewEvent: any
    isScheduleReply: boolean
    setScheduleReply: Dispatch<SetStateAction<boolean>>
}


const NewModal: React.FC<ModalProps> = ({ setNewEvent, handleCloseModal, handleChange, setShowModal, showModal, newEvent, isScheduleReply, setScheduleReply, handleSubmit }) => {
    const [start, setStart] = useState<Date>(new Date())
    const [end, setEnd] = useState<Date>(new Date())

    return (
        <div>
            <Transition show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setShowModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                {
                                                    isScheduleReply ? "Event successfully scheduled" : "Add Event"
                                                }
                                            </DialogTitle>

                                            <form action="submit" onSubmit={handleSubmit}>
                                                <div className="mt-2">
                                                    <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                                                        shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                                        focus:ring-inset focus:ring-violet-600 
                                                        sm:text-sm sm:leading-6 outline-none"
                                                        value={newEvent.title} onChange={(e) => handleChange(e)} placeholder="Title" />
                                                </div>
                                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                                        disabled={newEvent.title === ''}
                                                    >
                                                        Create
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                        onClick={handleCloseModal}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default NewModal;
