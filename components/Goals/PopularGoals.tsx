import ps5 from "@/public/images/ps5.jpeg"
import sneakers from "@/public/images/sneaker.png"
import birthday from "@/public/images/birthday.png"
import Image from "next/image"
import { Fredoka } from "next/font/google"
const fredoka = Fredoka({ subsets: ["latin"] })

const PopularGoals = () => {

    const popular = [
        {
            goal: "PS5",
            image: ps5,
            id: 1
        },
        {
            goal: "sneakers",
            image: sneakers,
            id: 2
        },
        {
            goal: "birthday",
            image: birthday,
            id: 1
        },

    ]
    return (
        <main className="p-3 mt-2">
            <h2 className={`${fredoka.className} text-xl p-3`}>Most Popular Goals</h2>
            <div className="flex w-full overflow-x-auto">
                {
                    popular.map((gol) => (
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

export default PopularGoals