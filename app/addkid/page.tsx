import UserForm from '@/components/UserForm'
import { Fredoka, Montserrat } from 'next/font/google'
import React from 'react'
const fredoka = Fredoka({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })

const page = () => {
    return (
        <div className='p-4'>
            <div className='mb-8'>
                <h2 className={`${fredoka.className} text-lg font-medium text-gray-600 mb-3`}>Add Child</h2>
                <p className={`${montserrat.className} text-[0.8rem] font-medium opacity-60`}>Add a child details, track thier perfomance and reward them</p>
            </div>
            <UserForm />
        </div>
    )
}

export default page