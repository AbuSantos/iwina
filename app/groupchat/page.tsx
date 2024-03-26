import MessageForm from '@/components/MessageForm'
import MessageReply from '@/components/MessageReply'
import React from 'react'

const GroupChat = () => {
    return (
        <div>Family Chat


            <div>
                <MessageForm />
                <MessageReply />
            </div>
        </div>
    )
}

export default GroupChat