import './index.css';
import Sidebar, { SidebarItem, SidebarGroup } from "./layout/Sidebar"
import { Home, Folder, Table, Telescope, Banknote, TreePalm, CandlestickChart, Gem, Settings, Activity, HousePlus } from "lucide-react";
import { useState } from "react";
import HomePage from "./components/Home"
import FileSummary from "./components/FileSummary"

const NotImplementedComponent = () => <div>Not Implemented Component</div>;


function App() {
  const [activeItem, setActiveItem] = useState("File Summary");


  const renderContent = () => {
    switch (activeItem) {
        case "Home":
          return <HomePage />;
        case "File Summary":
          return <FileSummary />;
        default:
          return <NotImplementedComponent />;
    }
  };
  
  return (
    <>
      <div className="flex">
        <Sidebar setActiveItem={setActiveItem} activeItem={activeItem}>

          <SidebarItem icon={Home} text="Home" />
          <SidebarItem icon={Folder} text="File Summary" />

          <SidebarGroup title="Transactions">
            <SidebarItem icon={Table} text="MintUI" />
            <SidebarItem icon={Telescope} text="Rollup Explorer" />
          </SidebarGroup>
          
          <SidebarGroup title="Reports">
            <SidebarItem icon={Banknote} text="Cash Flow" />
            <SidebarItem icon={Gem} text="Net Worth" />
          </SidebarGroup>
      
          <SidebarGroup title="Investments">
            <SidebarItem icon={Activity} text="Positions" />
            <SidebarItem icon={CandlestickChart} text="Trades" />
            <SidebarItem icon={HousePlus} text="Real Estate" />
            <SidebarItem icon={TreePalm} text="Retirement" />
          </SidebarGroup>

          <SidebarItem icon={Settings} text="Settings" bottom />
        
        </Sidebar>

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </>
  );
}

export default App;
