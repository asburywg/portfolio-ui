import {TabView, TabPanel} from "../layout/Tabs.js";

const Tab1Component = () => <div>Tab1 Contents</div>;
const Tab2Component = () => <div>Tab2 Contents</div>;
const Tab3Component = () => <div>Tab3 Contents</div>;

export default function Transactions() {
    return (
        <TabView>
            <TabPanel header="Mint">
                <Tab1Component/>
            </TabPanel>
            <TabPanel header="Rollup Explorer">
                <Tab2Component/>
            </TabPanel>
        </TabView>
    )
}