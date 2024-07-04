import React, { useState } from "react";

function TabView({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
        {/* tab headers */}
        <ul className="flex flex-wrap justify-center mb-6">
            {children.map((child, index) => (
                <li 
                    key={index}
                    className={`cursor-pointer text-lg bg-white mr-6 p-1 border-b-4 hover:border-indigo-200 ${
                        activeIndex === index ? "active border-indigo-300 font-extrabold" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                >
                    {child.props.header}
                </li>
            ))}
        </ul>

        {children.map((child, index) => (
            <div key={index} className={`tab-pane ${activeIndex === index ? "active" : "hidden"}`}>
                {child.props.children}
            </div>
        ))}
        </>
    );
}


function TabPanel({ children }) {
    return <div>{children}</div>;
}

export {
	TabView,
	TabPanel,
};