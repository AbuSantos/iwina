import ps5 from "@/public/images/ps5.jpeg"
import sneakers from "@/public/images/sneaker.png"
import birthday from "@/public/images/birthday.png"
import Image from "next/image"
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
        }
    ]
    return (
        <main>
            <h2>Most Popular Goals</h2>
            <div>
                {
                    popular.map((gol) => (
                        <div key={gol.id}>
                            <Image src={gol.image} alt={gol.goal} width={100} height={100} />
                            <h4>{gol.goal}</h4>
                        </div>
                    ))
                }
            </div>
        </main>
    )
}

export default PopularGoals