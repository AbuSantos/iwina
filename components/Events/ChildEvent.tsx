import ParentEvent from "../ui/ParentEvent"

const ChildEvent = () => {
    return (
        <div>
            <ParentEvent mode={"child"} />
        </div>
    )
}

export default ChildEvent