import { Fredoka, Poppins } from "next/font/google"
import Header from '@/components/ParentProfile/Header'
import ProfileFooter from "@/components/ParentProfile/ProfileFooter"

const fredoka = Fredoka({ subsets: ["latin"] })
const poppins = Poppins({ subsets: ["latin"], weight: "400" })

const Iwina = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center w-[98%] m-auto">

                <div >
                    <h2 className={`${fredoka.className} text-3xl text-violet-600 capitalize `}>iwina</h2>
                </div>
                <p className={`${poppins.className} text-center text-sm text-slate-600 p-2 tracking-normal`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, eius voluptates enim doloribus fugit nobis tenetur dicta dolor eum quidem aperiam soluta, sit culpa beatae cupiditate et cumque quia eaque modi incidunt porro numquam eveniet! Molestias id deserunt quos? Culpa iste harum consectetur hic itaque nemo quia iusto aliquam dolor veniam ex deleniti vitae optio odit minus necessitatibus alias, modi perspiciatis numquam eligendi odio assumenda eius! Omnis asperiores animi tempore quae a inventore dolor, possimus pariatur obcaecati ut perferendis eum quis vero corporis nulla quia cumque iusto in aperiam eligendi. Voluptatem in commodi labore assumenda neque pariatur maiores rerum sapiente.
                </p>
            </div>
            <ProfileFooter />

        </>

    )
}

export default Iwina
