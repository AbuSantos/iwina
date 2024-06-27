import { auth } from "@/auth"
const Deleted = async () => {
    const session = await auth()
    return (
        <div>

            {JSON.stringify(session)}
        </div>
    )
}

export default Deleted