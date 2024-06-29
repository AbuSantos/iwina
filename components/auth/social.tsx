"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import google from "@/public/images/google.svg"
import facebook from "@/public/images/facebook.svg"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const Social = () => {
    const onClick = (provider: "google") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        })
    }
    return (
        <div className="flex items-center gap-x-2 w-full">
            <Button size="lg" variant="outline" className="w-full" onClick={() => onClick("google")}>
                <Image src={google} alt="google" width={15} />
            </Button>
            <Button size="lg" variant="outline" className="w-full" onClick={() => { }}>
                <Image src={facebook} alt="google" width={15} />
            </Button>

        </div>
    )
}