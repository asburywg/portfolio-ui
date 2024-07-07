import { TabView, TabPanel } from "../layout/Tabs.js";
import { TransactionsTable } from "../components/TransactionsTable.js"
import { TransactionProvider } from '../context/TransactionContext';

export default function Transactions() {

    return (
        <TransactionProvider>
            <div className="flex flex-col h-screen">
                <div className="flex-1 overflow-hidden">
                    <div className="h-5/6 w-11/12 mx-auto mt-5">
                        <TransactionsTable filterable />
                    </div>
                </div>
            </div>
        </TransactionProvider>
        // <TabView>
        //     <TabPanel header="Mint">
        //     </TabPanel>
        //     {/* <TabPanel header="Rollup Explorer"> */}
        //         {/* <div className="h-3/4 w-4/5 mx-auto mt-2"> */}
        //             {/* <TransactionsTable filterable /> */}
        //         {/* </div> */}
        //     {/* </TabPanel> */}
        // </TabView>

    )
}