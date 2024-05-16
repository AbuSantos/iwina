import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='text-center absolute bottom-10 right-0 left-0 '>
                <button className='bg-violet-500 text-white rounded-full p-4 shadow-2xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        </footer>
    )
}

export default Footer