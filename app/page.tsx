"use client"
import Form from "@/components/Form";
import Nav from "@/components/Nav";
import Image from "next/image";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Feed from "@/components/Feed";
import UserForm from "@/components/UserForm";

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
            <Link href="/createTask"> Create Task</Link>
            <Feed />
          </> :
          <div>


            < div className="flex justify-center items-center h-screen flex-col w-full">
              {
                provider && Object.values(provider).map(prov => (
                  <button
                    key={prov.name}
                    onClick={() => signIn(prov.id)}
                    className="text-gray-50 text-lg ">
                    Sign in with {prov.name}
                  </button>
                ))
              }


              <UserForm />
            </div>
          </div>


      }

    </div>
  )
}
