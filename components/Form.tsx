"use client"
import { useState } from "react"
import Input from "./Input"
import clsx from "clsx"
type PropsType = {
    type: string
}
const Form = ({ type }: PropsType) => {
    const [task, setTask] = useState({
        description: "",
        deadline: "",
        points: ""
    })
    const [submit, setSubmit] = useState<boolean>(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmit(true)

        try {
            const response = await fetch("api/tasks/new", {
                method: "POST",
                body: JSON.stringify({
                    taskDesc: task.description,
                    taskDdl: task.description,
                    taskPnt: task.points
                })
            })
            if (response.ok) {
                console.log("task created successfully");
            }
        }   catch (error) {
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
        <div className="w-2/3">

            <span>{`${type} a task`}</span>
            <form action="submit">
                <div className="flex flex-col ">

                    <label htmlFor="task_description">
                        Task Description
                        <textarea required placeholder="Description" name="description" id="task_description" cols="30" rows="10" className={clsx(
                            "border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full text-gray-950",
                        )} value={task.description} onChange={handleChange} />
                    </label>
                    <label htmlFor="deadline">
                        Deadline
                        <Input placeholder="Add the deadline for this Task is any" type="datetime" name="deadline" id="deadline" className="w-2/4 rounded-none text-gray-950" value={task.deadline} onChange={handleChange} />
                    </label>
                    <label htmlFor="points">
                        Points
                        <Input required placeholder="Add Points to Earn for this task" type="number" name="points" id="number" className="w-2/4 rounded-none text-gray-950" value={task.points} onChange={handleChange} />
                    </label>
                    <button onClick={handleSubmit} type="submit" disabled={submit}>
                        {submit ? `${type}...` : type}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Form