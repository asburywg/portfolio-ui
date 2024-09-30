import Sidebar, { SidebarItem, SidebarGroup } from "./layout/Sidebar"
import { Home, Folder, Table, Banknote, TreePalm, CandlestickChart, Gem, Settings, Activity, HousePlus, CircleDollarSign} from "lucide-react";
import { useState } from "react";
import AccountsPage from "./pages/Accounts"
import IncomePage from "./pages/Income"
// import HomePage from "./pages/Home"
// import FileSummary from "./pages/FileSummary"
import Transactions from "./pages/Transactions"
// import Retirement from "./pages/Retirement"
import CashFlow from "./pages/CashFlow"
// import TransactionsFull from "./pages/TransactionsFull"
import SocketTest from './pages/SocketTest'

const NotImplementedComponent = () => <div>Not Implemented Component</div>;


function App() {
  const [activeItem, setActiveItem] = useState("Socket Example");


  const renderContent = () => {
    switch (activeItem) {
        case "Socket Example":
          return <SocketTest />;
        case "Accounts":
          return <AccountsPage />;
        case "Income":
          return <IncomePage />;
        // case "Home":
        //   return <HomePage />;
        // case "File Summary":
        //   return <FileSummary />;
        case "Transactions":
          return <Transactions />;
        // case "TransactionsFull":
        //   return <TransactionsFull />;
        // case "Retirement":
        //   return <Retirement />;
        case "Cash Flow":
          return <CashFlow />;
        default:
          return <NotImplementedComponent />;
    }
  };


  /**  MINT UI
   *    - Link account: associating dirctory with parser through institution metadata, specify accounts in statements (accounts M <--> 1 dir 1 <--> 1 parser)
   *    - Category heirarchy to rollup transactions, user can create/update/delete categories but rollup and group are static (group 1 <--> M rollup 1 <--> M category )
   *    - User can create labels, subset of a category, or tags, not constraint to a specific category, to associate with a transaction, as well as notes
   *    - category/label/tags/note metadata assignment should be contained in one datatable
   *    - variations of transaction table: 
   *        - fully filterable
   *        - side by side with date constraint rollup aggregation
   *    - when categorizing (with category or label) user may want to apply the same rule to other transactions in the same account or across all accounts
   *        - this option should be provided in the datatable
   *    - user should be able to see/edit all metadata and rules in settings
   *    - the result of categorization is a full aggregation summary of rollups for a view of income/expenses and where money flows
   * 
   *    - addtionally,
   *        - paycheck rollup summary (401k, taxes)
   *        - balance sheet (statements)
   *        - investments postitions (allocation/performance)
   * 
   * 
   * 
   *      Parsing Enablement:     parser <> directory <> account
   *      Parse Datasources:      file <> {transaction, statement, paycheck}
   *      Metadata Enhancement:   category, tag, label, rules
   * 
   *      Investment:             activity, tax_lot, trades
   */

  return (
    <>
      <div className="flex">
        <Sidebar setActiveItem={setActiveItem} activeItem={activeItem}>

          <SidebarItem icon={Home} text="Socket Example" />
          <SidebarItem icon={Folder} text="Accounts" />
          <SidebarItem icon={CircleDollarSign} text="Income" />
          <SidebarItem icon={Banknote} text="Cash Flow" alert />
          <SidebarItem icon={Table} text="Transactions" alert />

          {/* <SidebarItem icon={Home} text="Home" />
          <SidebarItem icon={Folder} text="File Summary" />
          <SidebarItem icon={Table} text="Transactions" alert />
          <SidebarItem icon={Table} text="TransactionsFull" alert /> */}
          
          {/* <SidebarGroup title="Reports">
            <SidebarItem icon={Banknote} text="Cash Flow" alert />
            <SidebarItem icon={Gem} text="Net Worth" alert />
          </SidebarGroup> */}
      
          {/* <SidebarGroup title="Investments">
            <SidebarItem icon={Activity} text="Positions" alert />
            <SidebarItem icon={CandlestickChart} text="Trades" disabled />
            <SidebarItem icon={HousePlus} text="Real Estate" disabled />
            <SidebarItem icon={TreePalm} text="Retirement" alert />
          </SidebarGroup> */}

          {/* <SidebarItem icon={Settings} text="Settings" bottom /> */}
        
        </Sidebar>

        <main className="flex-1">{renderContent()}</main>
      </div>
    </>
  );
}

export default App;
