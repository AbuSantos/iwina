import CompletedTask from '@/components/CompletedTask'
import Header from '@/components/ParentProfile/Header'
import ProfileBody from '@/components/ParentProfile/ProfileBody'
import ProfileFooter from '@/components/ParentProfile/ProfileFooter'
// import Profile from '@/components/Profile'
import React from 'react'


const page = () => {
    return (
        <div>
            <Header />
            <div>
                <ProfileBody />
            </div>

            <div>
                <ProfileFooter />
            </div>
        </div>
    )
}

export default page