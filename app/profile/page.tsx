import CompletedTask from '@/components/CompletedTask'
import Header from '@/components/ParentProfile/Header'
import ProfileFooter from '@/components/ParentProfile/ProfileFooter'
import Profile from '@/components/Profile'
import React from 'react'


const page = () => {
    return (
        <div>
            <Header />
            <div>
                <Profile />
            </div>

            <div>
                <ProfileFooter />
            </div>
        </div>
    )
}

export default page