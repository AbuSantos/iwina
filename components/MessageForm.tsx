"use client"
import { useState } from "react"
import Input from "./Input"
import { useSession } from "next-auth/react"

const MessageForm = () => {
    const [message, setMessage] = useState("")
    const { data: session } = useSession()
    const userId = session?.user?.id
    console.log(userId);

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await fetch(`api/groupchat/new`, {
                method: "POST",
                body: JSON.stringify({ message, userId })
            })
            if (res.ok) {
                console.log("message created successfully");
                setMessage("")
            }
            console.log(message)
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div>
            <form action="submit" method="post" onSubmit={handleSubmit}>
                <div>
                    <textarea
                        name="message"
                        placeholder="Please type your message"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        required
                        className="w-4/6 flex  mt-2 p-3 text-sm text-gray-500 outline-0"
                    />
                </div>
                <button> Send Message</button>
            </form>
        </div>
    )
}

export default MessageForm