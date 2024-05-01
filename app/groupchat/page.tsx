import KidsScroll from '@/components/KidsScroll'
import MessageForm from '@/components/MessageForm'
import MessageReply from '@/components/MessageReply'
import React from 'react'

const GroupChat = () => {
    return (
        <div>
            <div>
                <KidsScroll />
            </div>
            <div>
                <MessageReply />
                <MessageForm />
            </div>
        </div>
    )
}

export default GroupChat