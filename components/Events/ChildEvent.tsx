"use client"
import { useSearchParams } from "next/navigation"
import ParentEvent from "../ui/ParentEvent"
const ChildEvent = () => {
    const searchParams = useSearchParams()
    const childId = searchParams.get("id")
    return (
        <div>
            <ParentEvent mode={"child"} childId={childId} />
        </div>
    )
}

export default ChildEvent