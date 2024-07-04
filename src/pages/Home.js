import {TabView, TabPanel} from "../layout/Tabs.js";

// flex justify-center w-full h-full 
const Tab1Component = () => <div className="border-solid border-4">Tab1 Contents</div>;
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