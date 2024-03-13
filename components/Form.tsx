import { useState } from "react"
import Input from "./Input"
const Form = () => {
    const [task, setTask] = useState({
        desc: "",
        deadline: ""
        , points: ""
    })

    const handleSubmit = async (e:) => {

    }
    return (
        <div className="w-2/3 ">

            <form action="submit">
                <div className="flex flex-col ">

                    <label htmlFor="task_description">
                        Task Description
                        <textarea name="" id="task_description" cols="30" rows="10" className="text-gray-900" />
                    </label>
                    <label htmlFor="deadline">
                        Deadline
                        <Input type="datetime" name="deadline" id="deadline" className="w-2/4 rounded-none text-gray-950" />
                    </label>
                    <label htmlFor="points">
                        Points
                        <Input type="number" name="points" id="number" className="w-2/4 rounded-none text-gray-950" />
                    </label>
                </div>

            </form>
        </div>
    )
}

export default Form