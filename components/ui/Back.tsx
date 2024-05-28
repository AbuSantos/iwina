"use client"
import { useRouter, useSearchParams } from 'next/navigation'

const Back = ({ className }) => {
    const router = useRouter()

    return (
        <div className='w-12 cursor-pointer p-2' onClick={() => router.back()} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={className} className="w-6 h-6 font-semibold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
        </div>
    )
}

export default Back