"use client"
import { useState } from "react"
import Input from "./Input"

const MessageForm = () => {
    const [message, setMessage] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        console.log(message)
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