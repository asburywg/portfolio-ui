
import ProgressLine from "./diagrams/ProgressLine";


function Module401k({ current_perc, projected_perc, current_amt, proected_amt, limit }) {

    const remaining = limit - current_amt - proected_amt
    console.log(remaining);

    /*
    color: "#00b306",
    color: "#99ffbb",
    color: "#e6e6e6",

    gold, lightsteelblue, ''
    **/

    return (
        <>

            <ProgressLine
                label="2024 Contributions"
                contrPerc={6}
                visualParts={[
                    {
                        percentage: `${current_perc}%`,
                        color: "#4CAF50",
                        label: "YTD",
                        amount: current_amt
                    },
                    {
                        percentage: `${projected_perc}%`,
                        color: "#FFC107",
                        label: "Projected",
                        amount: proected_amt
                    },
                    {
                        percentage: `${100-projected_perc-current_perc}%`,
                        color: "",
                        label: "Remaining",
                        amount: remaining
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