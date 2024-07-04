import Sidebar, { SidebarItem, SidebarGroup } from "./layout/Sidebar"
import { Home, Folder, Table, Banknote, TreePalm, CandlestickChart, Gem, Settings, Activity, HousePlus } from "lucide-react";
import { useState } from "react";
import HomePage from "./pages/Home"
import FileSummary from "./pages/FileSummary"
import Transactions from "./pages/Transactions"

const NotImplementedComponent = () => <div>Not Implemented Component</div>;


function App() {
  const [activeItem, setActiveItem] = useState("Transactions");


  const renderContent = () => {
    switch (activeItem) {
        case "Home":
          return <HomePage />;
        case "File Summary":
          return <FileSummary />;
        case "Transactions":
          return <Transactions />;
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
          <SidebarItem icon={Table} text="Transactions" />
          
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

        <main className="flex-1">{renderContent()}</main>
      </div>
    </>
  );
}

export default App;
