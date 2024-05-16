import React from 'react'
import laptop from "@/public/images/laptop.png"
import tithe from "@/public/images/tithe.png"
import book from "@/public/images/book.png"
import charity from "@/public/images/charity.png"
import { Fredoka } from 'next/font/google'
import Image from 'next/image'
const fredoka = Fredoka({ subsets: ["latin"] })

const othergoals = [
    {
        goal: "charity",
        image: charity,
        id: 1
    },
    {
        goal: "tithe",
        image: tithe,
        id: 2
    },
    {
        goal: "book",
        image: book,
        id: 3

    },
    {
        goal: "laptop",
        image: laptop,
        id: 4
    }
]
const OtherGoals = () => {
    return (
        <main className='p-3'>
            <h2 className={`${fredoka.className} text-xl p-3`}>Most Popular Goals</h2>
            <div className="grid grid-cols-2 gap-2 w-full overflow-x-auto">
                {
                    othergoals.map((gol) => (
                        <div key={gol.id} className="w-32  p-4 bg-violet-400 ml-2 rounded-lg ">
                            <Image src={gol.image} alt={gol.goal} width={100} height={100} />
                            <h4 className={`${fredoka.className} text-lg text-slate-100 capitalize`}>{gol.goal}</h4>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default OtherGoals