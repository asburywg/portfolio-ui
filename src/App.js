import './index.css';
import Sidebar, { SidebarItem } from "./components/Sidebar"
import { LayoutDashboard, Home, Layers, Flag, Calendar, LifeBuoy, Settings } from "lucide-react";

function App() {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" />
        </Sidebar>
      </div>
    </>

    // <div className="App">
    //   <div className="flex">
    //    <Sidebar>
    //       <SidebarItem text="Home" />
    //     </Sidebar>
    //     {/* </div> */}
    //   {/* <header className="App-header">
    //       Portfolio UI
    //   </header> */}
    //   {/* <div className="flex"> */}
       
    //   {/* </div> */}
    // </div>
  );
}

export default App;
