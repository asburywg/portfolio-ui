import './index.css';
import Sidebar, { SidebarItem, SidebarGroup } from "./layout/Sidebar"
import { Home, Folder, Table, Telescope, Banknote, TreePalm, CandlestickChart, Gem, Settings, Activity, HousePlus } from "lucide-react";
import { useState } from "react";
import HomePage from "./components/Home"

const NotImplementedComponent = () => <div>Not Implemented Component</div>;


function App() {
  const [activeItem, setActiveItem] = useState("Home");


  const renderContent = () => {
    switch (activeItem) {
        case "Home":
            return <HomePage />;
        default:
            return <NotImplementedComponent />;
    }
  };
  
  return (
    <>
      <div className="flex">
        <Sidebar setActiveItem={setActiveItem} activeItem={activeItem}>

          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<Folder size={20} />} text="File Summary" />

          <SidebarGroup title="Transactions">
            <SidebarItem icon={<Table size={20} />} text="MintUI" />
            <SidebarItem icon={<Telescope size={20} />} text="Rollup Explorer" />
          </SidebarGroup>
          
          <SidebarGroup title="Reports">
            <SidebarItem icon={<Banknote size={20} />} text="Cash Flow" />
            <SidebarItem icon={<Gem size={20} />} text="Net Worth" />
          </SidebarGroup>
      
          <SidebarGroup title="Investments">
            <SidebarItem icon={<Activity size={20} />} text="Positions" />
            <SidebarItem icon={<CandlestickChart size={20} />} text="Trades" />
            <SidebarItem icon={<HousePlus size={20} />} text="Real Estate" />
            <SidebarItem icon={<TreePalm size={20} />} text="Retirement" />
          </SidebarGroup>

          <SidebarItem icon={<Settings size={20} />} text="Settings" bottom />
        
        </Sidebar>

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </>
  );
}

export default App;
