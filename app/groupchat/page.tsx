import KidsScroll from '@/components/KidsScroll'
import MessageForm from '@/components/MessageForm'
import MessageReply from '@/components/MessageReply'
import React from 'react'

const GroupChat = () => {
    return (
        <div >
            <div style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, zIndex: 999,
                cursor: 'pointer',
                backgroundColor: "#fff"
            }}>
                <KidsScroll />
            </div>
            <div className='mt-36 '>
                <MessageReply />
                <MessageForm />
            </div>
        </div>
    )
}

export default GroupChat