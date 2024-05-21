
const Tab = ({ handleTab, activeTab, tab1, tab2 }) => {
    return (
        <div>
            <nav className="flex w-full bg-white items-center justify-center space-x-3 text-sm text-slate-500">
                <p
                    onClick={() => handleTab("goals")}
                    className={`cursor-pointer p-2 eventTab ${activeTab === "goals" && "text-slate-900 active"}`}
                >
                    {tab1}
                </p>
                <p
                    onClick={() => handleTab("home")}
                    className={`cursor-pointer p-2 eventTab ${activeTab === "home" && "text-slate-900 active"}`}
                >
                    {tab2}
                </p>
            </nav>
        </div>
    )
}

export default Tab