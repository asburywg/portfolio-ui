import React, { useEffect, useState } from "react";
import "./ProgressLine.css";
import { formatCurrency } from '../../Utils.js'

const expected_input = [{
    percentage: "0%",
    color: "white",
    label: ""
}]


const ProgressLine = ({ label, backgroundColor = "#e5e5e5", visualParts = expected_input }) => {

    const [widths, setWidths] = useState(visualParts.map(() => { return 0; }));

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        requestAnimationFrame(() => {
            setWidths(visualParts.map(item => { return item.percentage; }));
        });
    }, [visualParts]);

    return (
        <div className='contr'>
            <div className="mb-7 text-2xl progressLabel">{label}</div>
           
            
            <div className="flex h-10" style={{ backgroundColor }}>
                {visualParts.map((item, index) => {
                    return (
                        <div key={index} style={{ width: widths[index], backgroundColor: item.color }}
                            className="transition-all duration-[2000ms] flex items-center justify-end">
                                {/* <p id='hideMe' className="mr-auto italic text-sm pl-2">{item.label}</p> */}
                                {/* <p id='hideMe' className="mr-auto italic pl-2">{formatCurrency(item.amount)}</p> */}
                                {/* <p id='hideMe' className="text-xl font-extrabold pr-4">{formatCurrency(item.amount)}</p> */}
                                <p id='hideMe' className="text-lg font-extrabold pr-4">{item.percentage}</p>
                        </div>
                    );
                })}
            </div>
            
            <div className="flex text-center text-sm mt-3 italic progressLabel">
                {visualParts.map((item, index) => {
                    return (
                        <div key={index} style={{ width: widths[index] }}>
                            {item.label}
                        </div>
                    );
                })}
            </div>

            <div className="flex text-center my-1 text-base font-bold progressLabel">
                {visualParts.map((item, index) => {
                    return (
                        <div key={index} style={{ width: widths[index] }}>
                            {formatCurrency(item.amount)}
                        </div>
                    );
                })}
            </div>
           



        </div>
    );
};

export default ProgressLine;
