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

        </div >
    )
}

export default AddCustomGoal