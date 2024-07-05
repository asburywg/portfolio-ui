import { TabView, TabPanel } from "../layout/Tabs.js";
import { Module401k } from "../components/401k.js"

export default function Retirement() {

    return (
            <TabView>
                <TabPanel header="401(k)">

                    <div className="h-5/6 w-5/6 mx-auto mt-5">
                        <Module401k />
                    </div>

                </TabPanel>
                <TabPanel header="IRA">
                    IRA
                </TabPanel>
            </TabView>
    )
}