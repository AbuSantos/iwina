type TabType = {
    handleTab?: (tab: string) => void,
    activeTab?: string,
    tab1?: string,
    tab2?: string,
    tab3?: string,
    tab4?: string,
    tab5?: string,
    tab6?: string,
    role?: string,
    mode?: string

}

const Tab = (props: TabType) => {
    const { handleTab, activeTab, tab1, tab2, tab3, tab4, role, mode, tab5, tab6 } = props
    return (
        <div>
            <nav className="flex w-full bg-white items-center justify-center space-x-3 text-sm text-slate-500">

                {
                    mode === "about" ?
                        <>
                            <p
                                onClick={() => handleTab("about")}
                                className={`cursor-pointer p-2 eventTab ${activeTab === "about" && "text-slate-900 active"}`}
                            >
                                {tab5}
                            </p>
                            <p
                                onClick={() => handleTab("bank")}
                                className={`cursor-pointer p-2 eventTab ${activeTab === "bank" && "text-slate-900 active"}`}
                            >
                                {tab6}
                            </p>
                        </> : ""

                }
                <p
                    onClick={() => handleTab("home")}
                    className={`cursor-pointer p-2 eventTab ${activeTab === "home" && "text-slate-900 active"}`}
                >
                    {tab2}
                </p>
                <p
                    onClick={() => handleTab("goals")}
                    className={`cursor-pointer p-2 eventTab ${activeTab === "goals" && "text-slate-900 active"}`}
                >
                    {tab1}
                </p>

                {
                    role === "parent" ? <>
                        <p
                            onClick={() => handleTab("info")}
                            className={`cursor-pointer p-2 eventTab ${activeTab === "info" && "text-slate-900 active"}`}
                        >
                            {tab3}
                        </p>
                        <p
                            onClick={() => handleTab("events")}
                            className={`cursor-pointer p-2 eventTab ${activeTab === "events" && "text-slate-900 active"}`}
                        >
                            {tab4}
                        </p>
                    </> : ""
                }

            </nav>
        </div>
    )
}

export default Tab