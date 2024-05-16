import Header from '@/components/Goals/Header'
import OtherGoals from '@/components/Goals/OtherGoals'
import PopularGoals from '@/components/Goals/PopularGoals'
import React from 'react'

const AddGoal = () => {
    return (
        <main>

            <div>
                <Header />
            </div>
            <div>
                <PopularGoals />
            </div>
            <div>
                <OtherGoals />
            </div>
        </main>
    )
}

export default AddGoal