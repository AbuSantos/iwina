import React from 'react'
import Footer from './Footer'

function StepThree({ handleSubmit }) {
    return (
        <div>
            <h1>All Done </h1>
            <p>lets start earning</p>
            <div>
                <Footer handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default StepThree