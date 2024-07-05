import { TabView, TabPanel } from "../layout/Tabs.js";
import { Module401k } from "../components/401k.js"

const contr_data = {"current_perc": 25.21, "projected_perc": 36.13, "current_amt": 4132.41, "proected_amt": 4124.12, "limit": 23000}

export default function Retirement() {

    return (
        <TabView>
            <TabPanel header="401(k)">

                <div className="h-5/6 w-5/6 mx-auto mt-5">
                    <Module401k {...contr_data} />
                </div>

            </TabPanel>
            <TabPanel header="IRA">
                IRA
            </TabPanel>
        </TabView>
    )
}