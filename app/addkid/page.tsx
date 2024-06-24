import UserForm from '@/components/UserForm'
import { Fredoka, Montserrat } from 'next/font/google'
import React from 'react'
const fredoka = Fredoka({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })

const page = () => {
    return (
        <div className='p-4'>
            <div className='mb-2'>
                <h2 className={`${fredoka.className} text-xl font-medium text-gray-600 mb-2 text-center`}>Add a Child</h2>
            </div>
            <UserForm />
        </div>
    )
}

export default page