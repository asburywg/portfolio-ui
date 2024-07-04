import {TabView, TabPanel} from "../layout/Tabs.js";

const Tab1Component = () => <div>Tab1 Contents</div>;
const Tab2Component = () => <div>Tab2 Contents</div>;
const Tab3Component = () => <div>Tab3 Contents</div>;

export default function HomePage() {
    return (
        <TabView>
            <TabPanel header="Summary">
                <Tab1Component/>
            </TabPanel>
            <TabPanel header="Diagram">
                <Tab2Component/>
            </TabPanel>
            <TabPanel header="Source Data">
                <Tab3Component/>
            </TabPanel>
        </TabView>
    )
}