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
                    className={`cursor-pointer font-medium bg-white mr-4 p-2 border-b-4 hover:text-pink-600 hover:border-accent-900 ${
                        activeIndex === index ? "active border-pink-300" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                >
                    {child.props.header}
                </li>
            ))}
        </ul>
        <div className="tab-content">
            {children.map((child, index) => (
                <div key={index} className={`tab-pane ${activeIndex === index ? "active" : "hidden"}`}>
                    {child.props.children}
                </div>
            ))}
        </div>
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