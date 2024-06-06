import React from 'react'
import { IoClose } from 'react-icons/io5'
import CommentForm from './CommentForm'
import CommentReply from './CommentReply'

const CommentModal = ({ setOpenModal, taskId, user, creator }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">

            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={() => setOpenModal(false)}
            ></div>

            <div className="relative p-4 w-full max-w-2xl h-3/6 text-gray-200 bg-[#dfd7fb] rounded-tl-3xl rounded-tr-3xl dark:bg-gray-700 slide-In">
                <div className="flex justify-end">
                    <button
                        className="text-gray-200 text-3xl"
                        onClick={() => setOpenModal(false)}
                    >
                        <IoClose />
                    </button>
                </div>
                <div>
                    <CommentReply />
                    <CommentForm taskId={taskId} user={user} creator={creator} />
                </div>
            </div>
        </div>
    )
}

export default CommentModal
