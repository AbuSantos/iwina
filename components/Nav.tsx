"use client"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useEffect, useState } from "react";

const Nav = () => {
    const { data: session } = useSession()
    const [provider, setProvider] = useState(null)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()
            setProvider(response)
        }

        setProviders()
    }, [])
    console.log(session, "provider");

    return (
        <div className="text-gray-50">

            {session?.user ?

                <button onClick={signOut}> Signout </button> : <>
                    {
                        provider && Object.values(provider).map(prov => {
                            <button key={prov.name}
                                onClick={() => signIn(prov.id)}>
                                Sign in
                            </button>
                        })
                    }
                </>

            }




        </div>
    )
}

export default Nav