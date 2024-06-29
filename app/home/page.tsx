import { auth, signOut } from "@/auth"
const HomePage = async () => {
    const session = await auth()
    console.log("role", session.user.role)
    return (
        <div>

            {JSON.stringify(session)}
            <form action={async () => {
                "use server"

                await signOut()
            }}>
                <button type="submit">
                    Logout
                </button>
            </form>
        </div>
    )
}

export default HomePage