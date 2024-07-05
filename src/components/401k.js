
import ProgressLine from "./subcomponents/ProgressLine";


function Module401k({ current_perc, projected_perc, current_amt, proected_amt }) {

    return (
        <>

            <ProgressLine
                label="2024 Contributions"
                visualParts={[
                    {
                        percentage: `${current_perc}%`,
                        color: "lightsteelblue"
                    },
                    {
                        percentage: `${projected_perc}%`,
                        color: "gold"
                    },
                    {
                        percentage: `${100-projected_perc-current_perc}%`,
                        color: ""
                    }
                ]}
            />

            {/* border-solid border-2 border-black */}
            {/* <div className="mb-6 h-8 w-full ">
            <div className="h-7 bg-yellow-300" style={{ width: `${current_perc}%` }}>{current_perc}</div>
        </div> */}
        </>
    );
}

export {
    Module401k,
};