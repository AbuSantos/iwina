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
import ParentEvent from "@/components/ui/ParentEvent";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";
import LoginRegister from "@/components/login/Login";
const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] })
// import { signIn } from "next-auth/react"

interface SessionUser {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}
const Home = () => {
  const { data: session, status } = useSession()
  const [provider, setProvider] = useState(null)
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const setProviders = async () => {

      const resp = await getProviders()
      setProvider(resp)

    }
    setProviders()
  }, [])

  console.log(session)

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const user = session.user as SessionUser;
      setUserId(user.id);
    } else {
      console.log("Session or user data is not available yet.");
    }
  }, [session, status]);

  // if (status === "loading" || userId === null) {
  //   return <div>Loading...</div>;

  // }

  useEffect(() => {
    if (userId) {
      const addKnockUser = async () => {
        const knockClient = new Knock(
          "sk_test_-qFDqPZTV0Hi1FeA5U0ZICkqgkOljy2hNNs4e_1nrcQ"
        );
        const knockUser = await knockClient.users.identify(userId, {
          name: session?.user?.name,
          email: session?.user?.email,
        });
        // console.log(knockUser);
      };
      addKnockUser();
    }
  }, [userId, session]);

  const onClick = (provider: "google" | "credentials") => {
    signIn(provider, {
      callbackUrl: "/",
    })
  }

  return (
    <div className="flex justify-center items-center flex-col w-full">
      {
        session?.user ?
          <>
            <Nav />
            <KidsScroll />
            <Task />
            <ParentEvent mode={"parent"} />
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

              <div className="flex flex-col justify-center mt-5">


                <Link href="/auth/login" className="text-xl p-4 w-11/12 mb-3 bg-[#fff] text-[#4f2190] border-2 border-[#4f2190] m-auto font-medium rounded-full text-center">
                  Continue as Kids
                </Link>

                <button onClick={() => onClick("google")} className="text-xl p-4 w-11/12 mb-3 bg-[#4f2190] text-[#faf9fb] border-2 border-[#4f2190] m-auto font-medium rounded-full text-center">
                  Sign in as Parent
                </button>

                {/* {
                  provider && Object.values(provider).map((prov: any) => (

                    <button
                      key={prov.name}
                      onClick={() => signIn(prov.id, {
                        callbackUrl: "/home"
                      })}
                      className={`text-xl p-4 w-11/12 mb-3 
                      ${prov.name === "Google" ? "bg-[#4f2190] text-[#faf9fb] "
                          : "bg-[#fff] text-[#4f2190] border-2 border-[#4f2190]"}
                           m-auto font-medium rounded-full
                    `}>
                      Sign in {prov.name}
                    </button>
                  ))
                } */}

              </div>
            </div>
          </div>
      }

    </div >
  )
}

export default Home