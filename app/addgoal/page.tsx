import Header from '@/components/Goals/Header'
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
        </main>
    )
}

export default AddGoal