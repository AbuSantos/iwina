import CompletedTask from '@/components/CompletedTask'
import React from 'react'

const Profile = () => {
    return (
        <div>
            <div className=''>

                <h2>Name:</h2>
                <h4>Total Points Earned :</h4>
            </div>
            <div>
                <CompletedTask />
            </div>

        </div>
    )
}

export default Profile