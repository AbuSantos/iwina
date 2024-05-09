import { useState } from 'react';
import Modal from 'react-modal';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
function TestModal({ closeModal, openModal, modalIsOpen, setIsOpen }) {
    const [start, setStart] = useState<Date>(new Date())
    const [end, setEnd] = useState<Date>(new Date())
    const [title, setTitle] = useState<string>("")

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
            // style={customStyles}
            >
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} />


                </form>
                <div>
                    <div>
                        <label>
                            Start Date
                        </label>
                        <Datetime value={start} onChange={(date) => setStart(date)} />
                    </div>
                    <div>
                        <label>
                            End Date
                        </label>
                        <Datetime value={end} onChange={(date) => setEnd(date)} />

                    </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 sm:col-start-2 disabled:opacity-25"
                    // disabled={newEvent.title === ''}
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
            </Modal>
        </div>
    )
}

export default TestModal