import React from 'react'
import { IoClose } from 'react-icons/io5'
import CommentForm from './CommentForm'
import CommentReply from './CommentReply'

const CommentModal = ({ setOpenModal, taskId, user, creator }) => {
    return (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center" style={{ overflowY: 'auto', maxHeight: '100%' }}>

            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setOpenModal(false)}
            ></div>

            <div className="relative p-4 w-full max-w-2xl h-3/6 text-gray-200 bg-gray-100 rounded-tl-3xl rounded-tr-3xl slide-In overflow-y-auto mb-14">
                <div className="flex justify-end">
                    <button
                        className="text-violet-500 text-xl"
                        onClick={() => setOpenModal(false)}
                    >
                        <IoClose />
                    </button>
                </div>
                <div >
                    <CommentReply taskId={taskId} />
                    <CommentForm taskId={taskId} user={user} creator={creator} />
                </div>
            </div>
        </div>
    )
}

export default CommentModal
