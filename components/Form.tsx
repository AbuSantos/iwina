"use client"
import { useState } from "react"
import Input from "./Input"
import clsx from "clsx"
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"
import { Montserrat, Fredoka } from "next/font/google"
import { IoChevronBackSharp } from "react-icons/io5"



const montserrat = Montserrat({ subsets: ["latin"] });
const fredoka = Fredoka({ subsets: ["latin"] });

type PropsType = {
    type: string
}
const Form = ({ type }: PropsType) => {
    const router = useRouter()
    const [task, setTask] = useState({
        description: "",
        deadline: "",
        points: ""
    })
    const [submit, setSubmit] = useState<boolean>(false)
    const { data: session } = useSession()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)

        try {
            const response = await fetch("api/task/new", {
                method: "POST",
                body: JSON.stringify({
                    taskDesc: task.description,
                    taskDdl: task.deadline,
                    taskPnt: task.points,
                    userId: session?.user?.id
                })
            })
            if (response.ok) {
                console.log("task created successfully");
                router.push("/")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmit(false)
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setTask((prev) => ({ ...prev, [name]: value }))
    }
    return (
        <div className="w-11/12 p-3">
            <div className='flex items-center justify-between '>
                <IoChevronBackSharp style={{ fontSize: "25px" }} onClick={() => router.back()} />
                <h2 className={`text-center text-lg  ${fredoka.className} font-medium text-gray-500`} >{`${type} a task`}</h2>
                <p></p>
            </div>
            <form action="submit">
                <div className="flex flex-col ">
                    <label htmlFor="task_description" className={`py-4 ${fredoka.className} text-base  text-gray-500`}>
                        Task Description
                        <textarea required placeholder="Description" name="description" id="task_description" cols="30" rows="10" className={clsx(
                            "border-solid outline-none border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full text-gray-950",
                        )} value={task.description} onChange={handleChange} />
                    </label>
                    <label htmlFor="deadline" className={`${fredoka.className} text-base text-gray-500  `}>
                        Deadline
                        <Input placeholder="Deadline" type="datetime" name="deadline" id="deadline" className="w-2/4 rounded-none text-gray-950 outline-none" value={task.deadline} onChange={handleChange} />
                    </label>
                    <label htmlFor="points" className={`py-2 ${fredoka.className} text-base text-gray-500 `}>
                        Points
                        <Input required placeholder="Task stars" type="number" name="points" id="number" className="w-2/4 rounded-none text-gray-950 outline-none" value={task.points} onChange={handleChange} />
                    </label>
                    <button onClick={handleSubmit} type="submit" disabled={submit} className={`p-2 ${fredoka.className} text-base outline-none flex items-center justify-center bg-[#6229b3] text-[#dfd7fb] py-3 px-5 rounded-lg `} >
                        {submit ? `${type}...` : type}
                    </button>
                </div>

            </form >
        </div >
    )
}

export default Form