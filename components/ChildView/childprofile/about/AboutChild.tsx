"use client"
import Tab from '@/components/ui/Tab'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react';
import AddBank from '../../bank/AddBank';
const poppins = Poppins({ weight: '400', subsets: ["latin"] })

const AboutChild = ({ childId, data }) => {
    const [activeTab, setActiveTab] = useState<string>("about");
    const handleTab = (tab: string) => {
        setActiveTab(tab)
    }
    return (

        <div className='text-slate-700 w-full flex flex-col justify-center items-center '>
            <header className='flex items-center justify-center flex-col'>
                <Image src={data?.image} alt={data?.username} width={100} height={100} />
                <section >
                    <div className='flex gap-2 items-center justify-center '>
                        <p className='text-xl'>{data?.username}</p>
                        <p className='text-xl'>{data?.birthday}</p>
                    </div>
                </section>
            </header>
            <div>
                <Tab tab5={"about"} tab6={"Bank"} handleTab={handleTab} activeTab={activeTab} mode={"about"} />
            </div>


            {
                activeTab === "about" &&
                <div className='space-y-3  w-[95%]'>
                    <section className=' m-auto'>
                        <div className='space-x-2 p-2'>
                            <span className='text-lg text-slate-500'>Favorite Food </span>
                            <p className='text-xl text-slate-900 bg-slate-300 p-2 w-full'>{data.favFood}</p>
                        </div>

                        <div className='space-x-2 p-2'>
                            <span className='text-lg text-slate-500'>Bestfriend: </span>
                            <p className='text-xl text-slate-900 bg-slate-300 p-2 w-full'>{data.bestFriendName}</p>
                        </div>

                    </section>
                    <section className=''>
                        <div className='space-x-2 px-2'>
                            <span className='text-lg text-slate-500'>Favorite Song: </span>
                            <p className='text-xl text-slate-700 bg-slate-300 p-2 w-full'>{data.favSong}</p>
                        </div>
                        <div className='space-x-2 px-2'>
                            <span className='text-lg text-slate-500'>Favorite Artiste: </span>
                            <p className='text-xl text-slate-700 bg-slate-300 p-2 w-full'>{data.favArtiste}</p>
                        </div>
                    </section>
                    <section className=''>
                        <div className='space-x-2 px-2'>
                            <span className='text-lg text-slate-500'>Favorite Subject: </span>
                            <p className='text-xl text-slate-700 bg-slate-300 p-2 w-full'>{data.favSubject}</p>
                        </div>
                        <div className=' px-2 space-x-2'>
                            <span className='text-lg text-slate-500'>Favorite Teacher: </span>
                            <p className='text-xl text-slate-700 bg-slate-300 p-2 w-full'>{data.favTeachersName}</p>
                        </div>
                    </section>
                    <section className=''>
                        <div className='space-x-2 px-2'>
                            <span className='text-lg text-slate-500'>Favorite Subject: </span>
                            <p className='text-xl text-slate-700 bg-slate-300 p-2 w-full'>{data.favSubject}</p>
                        </div>
                        <div className='space-x-2 px-2 mb-16'>
                            <span className='text-lg text-slate-500'>Favorite Color: </span>
                            <p className='text-xl text-slate-700 bg-slate-300 p-2 w-full'>{data.favColor}</p>
                        </div>
                    </section>
                </div >
            }

            {
                activeTab === "bank" && <div className='space-y-3  w-[95%]'>
                    <AddBank />
                </div>
            }
        </div >

    )

}

export default AboutChild