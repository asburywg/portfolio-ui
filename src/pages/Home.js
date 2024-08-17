import {TabView, TabPanel} from "../layout/Tabs.js";
import { AccountStatus } from "../components/Accounts.js"

// flex justify-center w-full h-full 
const Tab1Component = () => <div className="h-full border-solid border-4">Tab1 Contents</div>;
const Tab2Component = () => <div>Tab2 Contents</div>;
const Tab3Component = () => <div>Tab3 Contents</div>;

export default function HomePage() {
    return (
        <div className="flex flex-col h-screen">
            <AccountStatus/>
        </div>
        
        // <TabView>
        //     <TabPanel header="Accounts">
        //         <AccountStatus/>
        //     </TabPanel>
        //     <TabPanel header="Summary">
        //         <Tab1Component/>
        //     </TabPanel>
        //     <TabPanel header="Source Data">
        //         <Tab3Component/>
        //     </TabPanel>
        // </TabView>
    )
}