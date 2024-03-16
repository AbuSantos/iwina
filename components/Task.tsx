import TaskCard from "./TaskCard";



const Task = ({ }) => {
    // const { data: session } = useSession()
    return (
        <section className="w-full">

            <p className="desc text-left">{desc}</p>
            <div className="mt-10  prompt_layout ">

                <TaskCard
                    deadline={deadline}
                    description={description}
                    points={points}
                    status={status}
                    key={index}
                />

            </div>
        </section>
    )
    )
}

export default Task