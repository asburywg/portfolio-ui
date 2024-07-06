import Sidebar, { SidebarItem, SidebarGroup } from "./layout/Sidebar"
import { Home, Folder, Table, Banknote, TreePalm, CandlestickChart, Gem, Settings, Activity, HousePlus } from "lucide-react";
import { useState } from "react";
import HomePage from "./pages/Home"
import FileSummary from "./pages/FileSummary"
import Transactions from "./pages/Transactions"
import Retirement from "./pages/Retirement"
import CashFlow from "./pages/CashFlow"

const NotImplementedComponent = () => <div>Not Implemented Component</div>;


function App() {
  const [activeItem, setActiveItem] = useState("Cash Flow");


  const renderContent = () => {
    switch (activeItem) {
        case "Home":
          return <HomePage />;
        case "File Summary":
          return <FileSummary />;
        case "Transactions":
          return <Transactions />;
        case "Retirement":
          return <Retirement />;
        case "Cash Flow":
          return <CashFlow />;
        default:
          return <NotImplementedComponent />;
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar setActiveItem={setActiveItem} activeItem={activeItem}>

          <SidebarItem icon={Home} text="Home" />
          <SidebarItem icon={Folder} text="File Summary" alert />
          <SidebarItem icon={Table} text="Transactions" alert />
          
          <SidebarGroup title="Reports">
            <SidebarItem icon={Banknote} text="Cash Flow" alert />
            <SidebarItem icon={Gem} text="Net Worth" alert />
          </SidebarGroup>
      
          <SidebarGroup title="Investments">
            <SidebarItem icon={Activity} text="Positions" alert />
            <SidebarItem icon={CandlestickChart} text="Trades" disabled />
            <SidebarItem icon={HousePlus} text="Real Estate" disabled />
            <SidebarItem icon={TreePalm} text="Retirement" alert />
          </SidebarGroup>

          <SidebarItem icon={Settings} text="Settings" bottom />
        
        </Sidebar>

        <main className="flex-1">{renderContent()}</main>
      </div>
    </>
  );
}

export default App;
