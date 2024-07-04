import { ChevronFirst, ChevronLast } from "lucide-react"
import { createContext, useContext, useState } from "react"

const SidebarContext = createContext();

export default function Sidebar({ children, setActiveItem, activeItem }) {
    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    
                    {/* expander */}
                    <div className="p-4 pb-2 mb-1 flex justify-between items-center">
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                        {/* <span className={`font-bold overflow-hidden ${expanded ? "w-44 ml-3" : "w-0"}`}>Portfolio UI</span> */}
                    </div>

                   <SidebarContext.Provider value={{ expanded, setActiveItem, activeItem }}>
                        <ul className="flex-1 px-3">{children.filter(child => !child.props.bottom)}</ul>
                        <hr className="my-1" />
                        <ul className="flex-none px-3 my-1">{children.filter(child => child.props.bottom)}</ul>
                    </SidebarContext.Provider>

                </nav>
            </aside>
        </>
    )
}

export function SidebarGroup({ title, children }) {
    const { expanded } = useContext(SidebarContext);

    return (
        <div>
            {expanded && (
                <div className={`mt-6 px-2 rounded-m font-bold`}>
                    {title}
                </div>
            )}
            <hr className="my-2" />
            {children}
        </div>
    );
}

export function SidebarItem({ icon: Icon, text }) {
    const { expanded, activeItem, setActiveItem } = useContext(SidebarContext);
    return (
        <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${activeItem === text ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}`}
            onClick={() => setActiveItem(text)}>
            <Icon size={20} />
            <span className={`overflow-hidden ${expanded ? "w-44 ml-3" : "w-0 h-6"}`}>{text}</span>

            {!expanded && (
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
                    {text}
                </div>
            )}
        </li>
    )
}