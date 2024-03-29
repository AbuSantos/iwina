"use client"
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import Image from "next/image";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Feed from "@/components/Feed";
import UserForm from "@/components/UserForm";
import display from "@/public/images/display.png";
import { Fredoka, Montserrat } from "next/font/google";


const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })

export default function Home() {
  const { data: session } = useSession()
  const [provider, setProvider] = useState(null)

  useEffect(() => {
    const setProviders = async () => {
      const resp = await getProviders()
      setProvider(resp)
    }

    setProviders()
  }, [])

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {
        session?.user ?
          <>
            <Nav signOut={signOut} />
            <Feed />
          </> :
          <div>
            < div className="flex justify-center flex-col ">
              <div className="flex justify-center items-center flex-col ">
                <h2 className="text-center text-2xl font-semibold p-5 ">iwina</h2>
                < Image src={display} width={300} className="h-96 mt-14" alt="black happy family" />
              </div>
              <div className="flex items-center flex-col">
                <h2 className={`text-center text-5xl text-gray-700 font-black ${fredoka.className}`}>Welcome</h2>
                <p className={`font-medium text-lg text-center mt-4 ${montserrat.className} w-11/12  `}>
                  Assign chores, Transfer Allowance, Teach Responsibility
                </p>
              </div>

              <div className="flex justify-center flex-col mt-8 w-full">
                {
                  provider && Object.values(provider).map((prov: any) => (

                    <button
                      key={prov.name}
                      onClick={() => signIn(prov.id)}
                      className={`text-xl p-4 w-11/12 mb-3 ${prov.name === "Google" ? "bg-[#4f2190] text-[#faf9fb] " : "bg-[#fff] text-[#4f2190] border-2 border-[#4f2190]"} m-auto font-medium rounded-full
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
