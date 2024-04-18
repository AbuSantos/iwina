"use client"
import Nav from "@/components/Nav";
import Image from "next/image";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import display from "@/public/images/display.png";
import { Fredoka, Montserrat } from "next/font/google";
import KidsScroll from "@/components/KidsScroll";
import Task from "@/components/Task";
import BottomNav from "@/components/BottomNav";
import { Knock } from "@knocklabs/node"
const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })

const Home = () => {
  const { data: session } = useSession()
  const [provider, setProvider] = useState(null)
  // const userId = (session?.user as any)?.id
  // console.log(session);


  useEffect(() => {
    const setProviders = async () => {
      const resp = await getProviders()
      setProvider(resp)
    }
    setProviders()
  }, [])

  // useEffect(() => {
  const addKnockUSer = async () => {
    const knockClient = new Knock("sk_test_-qFDqPZTV0Hi1FeA5U0ZICkqgkOljy2hNNs4e_1nrcQ")
    const knockUser = await knockClient.users.identify((session?.user as any)?.id, {
      name: session?.user?.name,
      email: session?.user?.email
    }
    )
    // const knockUser = await knockClient.users.get(userId);
    // console.log(knockUser);
  }
  addKnockUSer()
  // }, [])

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {
        session?.user ?
          <>
            <Nav />
            <KidsScroll />
            <Task />
            <BottomNav />
          </> :
          <div>
            < div className="flex justify-center flex-col ">
              <div className="flex justify-center items-center flex-col ">
                <h2 className="text-center text-2xl font-semibold p-5 ">iwina</h2>
                < Image src={display} width={300} className="h-96 mt-10" alt="black happy family" />
              </div>
              <div className="flex items-center flex-col">
                <h2 className={`text-center text-5xl text-gray-700 font-black ${fredoka.className}`}>Welcome</h2>
                <p className={`font-medium text-lg text-center mt-3 ${montserrat.className} w-11/12  `}>
                  Assign chores, Transfer Allowance, Teach Responsibility
                </p>
              </div>

              <div className="flex justify-center flex-col mt-5 w-full">
                {
                  provider && Object.values(provider).map((prov: any) => (

                    <button
                      key={prov.name}
                      onClick={() => signIn(prov.id)}
                      className={`text-xl p-4 w-11/12 mb-3 
                      ${prov.name === "Google" ? "bg-[#4f2190] text-[#faf9fb] "
                          : "bg-[#fff] text-[#4f2190] border-2 border-[#4f2190]"}
                           m-auto font-medium rounded-full
                    `}>
                      Sign in {prov.name}
                    </button>
                  ))
                }
              </div>

            </div>

          </div>
      }
    </div >
  )
}

export default Home