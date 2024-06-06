"use client"
import useSocket from '@/context/useSocket';
import React, { useEffect, useState } from 'react'

const CommentReply = ({ taskId }) => {
    const [message, setMessage] = useState([])
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
                    console.log(data)
                } catch (error) {
                    console.log(error.message)
                }
            }
            fetchComment()
        }

    }, [taskId]);
    return (
        <div></div>
    )
}

export default CommentReply