import './index.css';
import Sidebar, { SidebarItem } from "./components/Sidebar"
import { LayoutDashboard, Home, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";
import { useState } from "react";

const HomeComponent = () => <div>Home Content</div>;
const DashboardComponent = () => <div>Dashboard Content</div>;
const CalendarComponent = () => <div>Calendar Content</div>;
const TasksComponent = () => <div>Tasks Content</div>;
const ReportingComponent = () => <div>Reporting Content</div>;
const SettingsComponent = () => <div>Settings Content</div>;
const HelpComponent = () => <div>Help Content</div>;


function App() {
  const [activeItem, setActiveItem] = useState("Dashboard");


  const renderContent = () => {
    switch (activeItem) {
        case "Home":
            return <HomeComponent />;
        case "Dashboard":
            return <DashboardComponent />;
        case "Calendar":
            return <CalendarComponent />;
        case "Tasks":
            return <TasksComponent />;
        case "Reporting":
            return <ReportingComponent />;
        case "Settings":
            return <SettingsComponent />;
        case "Help":
            return <HelpComponent />;
        default:
            return <DashboardComponent />;
    }
  };
  
  return (
    <>
      <div className="flex">
        <Sidebar setActiveItem={setActiveItem} activeItem={activeItem}>
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>

        <main className="flex-1 p-6">{renderContent()}</main>


      </div>
    </>

    // <div className="App">
  
    //   {/* <header className="App-header">
    //       Portfolio UI
    //   </header> */}
    //   {/* <div className="flex"> */}
       
    //   {/* </div> */}
    // </div>
  );
}

export default App;
