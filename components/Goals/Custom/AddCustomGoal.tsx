import Image from 'next/image'
import React from 'react'
import bggoal from "@/public/images/bggoal.png"


const AddCustomGoal = () => {
    return (
        <div>
            <section>
                <figure className='flex items-center justify-center p-4'>
                    <Image src={bggoal} width={100} height={100} alt="bggoal" />
                </figure>
                <div className='flex flex-col gap-2 justify-center items-center  p-3 mt-12 bg-violet-400 h-96 w-[95%] m-auto rounded-b-2xl'>
                    <form action="" className='w-full'>
                        <div className='w-full p-2' >
                            <label htmlFor="title" className='block text-center text-slate-700 text-sm'>Goal title</label>
                            <input
                                type="text"
                                placeholder=""
                                className="rounded-none border-0 border-b-[0.5px] border-violet-300 w-full outline-none p-2 text-center bg-transparent text-violet-100 text-2xl font-medium"
                                id="title"
                            />
                        </div>
                        <div className='w-full p-2 mt-5 ' >
                            <label htmlFor="amount" className='block text-center text-slate-700 w-full text-sm'>Goal Amount</label>
                            <input
                                type="number"
                                placeholder=""
                                className="rounded-none border-0 border-b-[0.5px] border-violet-300 w-full outline-none p-2 text-center bg-transparent text-violet-100 text-2xl font-medium"
                                id="amount"
                            />
                        </div>
                        <div className='w-full p-2 mt-5 ' >
                            <label htmlFor="amount" className='block text-center text-slate-700 w-full text-sm'>% of points earned to be saved</label>
                            <input
                                type="number"
                                placeholder=""
                                className="rounded-none border-0 border-b-[0.5px] border-violet-300 w-full outline-none p-2 text-center bg-transparent text-violet-100 text-2xl font-medium"
                                id="amount"
                            />
                        </div>
                    </form>
                </div>

            </section>
            <footer>
                <div className='text-center absolute bottom-10 right-0 left-0'>
                    <button className='bg-violet-500 text-white rounded-full p-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </footer>
        </div >
    )
}

export default AddCustomGoal