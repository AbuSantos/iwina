"use client"
import useSocket from '@/context/useSocket';
import { FormatTimeDifference } from '@/lib/FormatTime';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const CommentReply = ({ taskId }) => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        if (taskId) {
            const fetchComment = async () => {
                try {
                    const res = await fetch(`api/comments/${taskId}`)
                    console.log(res)
                    if (!res) {
                        throw new Error("No Data found")
                    }
                    const data = await res.json()
                    setMessages(data)
                    console.log(data)
                } catch (error) {
                    console.log(error.message)
                }
            }
            fetchComment()
        }

    }, [taskId]);
    return (
        <div>
            {
                messages.map((message, index) => {
                    console.log(message)
                    // console.log(message["childId"].image)
                    return (
                        <div key={index} className=' py-2'>
                            <div className='flex items-center flex-start space-x-2 text-gray-900'>
                                <Image src={message["childId"].image} alt={message["childId"].username} width={30} height={30} />
                                <div className='flex flex-col '>
                                    <span className='text-[0.7rem] capitalize'>{message["childId"].username}</span>
                                    <span className='text-[0.45rem] text-gray-500'>
                                        {FormatTimeDifference(message.createdAt)}
                                    </span>
                                </div>
                            </div>


                            <p className='text-gray-800 text-[0.7rem] px-9 '>{message.message}</p>
                        </div>
                    )
                }, [])
            }
        </div>
    )
}

export default CommentReply