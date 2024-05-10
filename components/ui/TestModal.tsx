import { useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
function TestModal({ closeModal, openModal, modalIsOpen, setIsOpen, OnEventAdded }) {
    const [start, setStart] = useState<Date>(new Date())
    const [end, setEnd] = useState<Date>(new Date())
    const [title, setTitle] = useState<string>("")

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: "60%",
            width: "80%",
            padding: "10px"
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        OnEventAdded({
            title, start, end
        })
        closeModal()
    }

    return (
        <div >
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className=''>
                    <h2 className="text-base font-semibold leading-6 text-gray-900 p-2 text-center">
                        Add Event
                    </h2>
                    <form className='w-full' >
                        <input type="text" name="title"
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6 outline-none"
                            onChange={(e) => setTitle(e.target.value)} placeholder="Title"
                        />
                        <div>

                            {/* <div className='space-y-2 mt-2'>
                                <label className='text-sm font-semibold'>
                                    Select start Date
                                </label>
                                <Datetime value={start} onChange={(date) => setStart(date)} />
                            </div>
                            <div className='space-y-2'>
                                <label className='text-sm font-semibold'>
                                    End Date
                                </label>
                                <Datetime value={end} onChange={(date) => setEnd(date)} />

                            </div> */}
                        </div>
                    </form>


                    <div style={{
                        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 999, paddingTop: 0, padding: "10px"
                    }}>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3
                ">
                            <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                                // disabled={newEvent.title === ''}
                                onClick={handleSubmit}
                            >
                                Create
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default TestModal