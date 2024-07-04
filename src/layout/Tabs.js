import React, { useState } from "react";

function TabView({ children }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const childArray = React.Children.toArray(children);

    return (
        <div class="flex flex-col h-screen">

            {/* header */}
            <ul className="flex flex-wrap justify-center my-6">
                {childArray.map((child, index) => (
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

            {/* body, let component control margin */}
            {/* overflow-scroll  border-solid border-4   overflow-hidden bg-gray-100 mx-6  */}
            {childArray.map((child, index) => (
                <div key={index} className={`flex-1 bg-gray-100 ${activeIndex === index ? "active" : "hidden"}`}>
                    {child.props.children}
                </div>
            ))}
            {/* <div class="flex bg-blue-100">Footer</div> */}
        </div>
    );
}


function TabPanel({ children }) {
    return <div className="">{children}</div>;
}

export {
	TabView,
	TabPanel,
};