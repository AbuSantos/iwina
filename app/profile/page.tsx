import CompletedTask from '@/components/CompletedTask'
import Header from '@/components/ParentProfile/Header'
import Profile from '@/components/Profile'
import React from 'react'


const page = () => {
    return (
        <div>
            <Header />
            <div>
                <Profile />
            </div>

        </div>
    )
}

export default page