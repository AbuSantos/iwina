import React from 'react'
import bggoal from "@/public/images/bggoal.png"
import Image from 'next/image'

const page = () => {
    return (
        <main>
            <section>
                <p>1</p>
                <hr />
                <p>2</p>
                <hr />
                <p>3</p>
                <hr />
            </section>
            <section>
                <figure>
                    <Image src={bggoal} width={100} height={100} alt="bggoal" />
                </figure>
                <div>
                    
                </div>
            </section>
        </main>
    )
}

export default page