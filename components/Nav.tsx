import Link from "next/link"

const Nav = ({ signOut }) => {
    return (
        <div className="text-gray-50">
            <button onClick={signOut}>
                Sign out
            </button>

            <Link href="/profile">My Profile</Link>
        </div>
    )
}

export default Nav