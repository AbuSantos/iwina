import Link from "next/link"
import UserForm from "./UserForm"

const Nav = ({ signOut }) => {
    return (
        <div className="text-gray-50">
            <button onClick={signOut}>
                Sign out
            </button>

            <Link href="/profile">My Profile</Link>
            <Link href="/addkid">Add a child</Link>

        </div>
    )
}

export default Nav