"use client"
import useSocket from '@/context/useSocket';
import { FormatTimeDifference } from '@/lib/FormatTime';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const CommentReply = ({ taskId }) => {
    const [messages, setMessages] = useState([])
    const { data: session } = useSession()

    const userId = (session?.user as any)?.id

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
                    // console.log(data)
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
                messages.map((dm, index) => {
                    // console.log(dm)
                    const { _id, message, createdAt, creator } = dm
                    const childName = dm["childId"].username
                    const parentName = dm["parentId"].username

                    let isCurrentUserMessage: boolean
                    if (creator === userId) {
                        isCurrentUserMessage = true
                    }

                    return (
                        <div key={index} >
                            <div className={`flex  ${isCurrentUserMessage ? "justify-end" : "justify-start"} `}>

                                <div>
                                    <div className='flex items-center flex-start space-x-2 text-gray-900'>
                                        <Image src={dm["childId"].image} alt={dm["childId"].username} width={30} height={30} />
                                        <div className='flex flex-col '>
                                            {
                                                creator === userId ?
                                                    <span className='text-[0.7rem] capitalize'>
                                                        {
                                                            childName
                                                        }
                                                    </span> :
                                                    <span className='text-[0.7rem] capitalize'>
                                                        {
                                                            parentName
                                                        }
                                                    </span>
                                            }

                                            <span className='text-[0.45rem] text-gray-500'>
                                                {FormatTimeDifference(dm.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    <p className='text-gray-800 text-[0.7rem] px-9 '>{dm.message}</p>
                                </div>
                            </div>

                        </div>
                    )
                }, [])
            }
        </div>
    )
}

export default CommentReply