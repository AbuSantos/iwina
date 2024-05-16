import React from 'react'
import Image from 'next/image'
import Input from '@/components/Input'
import AddCustomGoal from '@/components/Goals/Custom/AddCustomGoal'

const page = () => {
    return (
        <main>
            <section className="flex items-center justify-center m-auto space-x-5 w-10/12 p-4 ">
                <div className="flex items-center w-full">
                    <p className={`h-12 w-12 bg-violet-700 rounded-full flex justify-center items-center text-violet-100 mx-2`}>
                        1
                    </p>
                    <hr className="bg-slate-600  flex-1" />
                </div>
                <div className="flex items-center w-full">
                    <p className={`h-12 w-12 bg-violet-300 rounded-full flex justify-center items-center text-violet-100 mx-2`}>
                        2
                    </p>
                    <hr className="bg-slate-600  flex-grow " />
                </div>
                <div className="flex items-center ">
                    <p className={`h-12 w-12 bg-violet-300 rounded-full flex justify-center items-center text-violet-100`}>
                        3
                    </p>
                </div>
            </section>

            <section>
                <AddCustomGoal />
            </section>
        </main>
    )
}

export default page