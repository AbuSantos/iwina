const Nav = ({ signOut }) => {
    return (
        <div className="text-gray-50">
            <button onClick={signOut}>
                Sign out
            </button>
        </div>
    )
}

export default Nav